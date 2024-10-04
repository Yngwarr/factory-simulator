import { v4 as uuid } from 'uuid';
import { batch, computed, signal } from '@preact/signals';
import { createContext } from 'preact';
import {
    createResource,
    type ProductionStep,
    type FactoryDesc,
    type Resource,
    dimensionsFromSteps,
    type Position,
    posEq,
} from './utils';
import { produce } from 'immer';

const dayDuration = 8 * 60;

export type FactoryState = ReturnType<typeof createFactoryState> | null;

export const factoryState = createContext<FactoryState>(null);

export function createFactoryState(factoryDesc: FactoryDesc) {
    const resources = signal<Resource[]>(
        factoryDesc.resources.flatMap(createResource),
    );

    const steps = signal<ProductionStep[]>(
        factoryDesc.steps.map((x) => {
            x.id = uuid();
            return x;
        }),
    );

    const selectedResourceId = signal<string | null>(null);

    return {
        resources,
        steps,
        week: signal(1),
        day: signal(1),
        timeMinutes: signal(0),
        cash: signal(factoryDesc.cash),
        selectedResourceId,
        pace: signal(0),
        intervalId: null as number | null,

        hoveredResourcePosition: signal<Position | null>(null),
        hoveredStepPosition: signal<Position | null>(null),

        links: factoryDesc.links,
        fixedExpenses: factoryDesc.fixedExpenses,

        dimensions: computed<Position>(() => {
            return dimensionsFromSteps(steps.value);
        }),
        groupedResources: computed<Resource[][]>(() => {
            const res = [];
            let type = null;

            for (const r of resources.value) {
                if (r.type !== type) {
                    type = r.type;
                    res.push([r]);
                } else {
                    res.at(-1).push(r);
                }
            }

            return res;
        }),
        selectedResource: computed<Resource | null>(() => {
            if (selectedResourceId.value === null) return null;

            return resources.value.find(
                (r) => r.id === selectedResourceId.value,
            );
        }),
    };
}

function isStepAssigned(step: ProductionStep) {
    return step.resourceId !== undefined;
}

function findStepIndex(ctx: FactoryState, id: string) {
    return ctx.steps.value.findIndex((step) => step.id === id);
}

function findResourceIndex(ctx: FactoryState, id: string) {
    return ctx.resources.value.findIndex((r) => r.id === id);
}

function step(ctx: FactoryState) {
    return () => {
        const minutes = ctx.timeMinutes.value + 1;

        // TODO update inputs

        // TODO update steps
        ctx.steps.value = produce(ctx.steps.value, (draft) => {
            for (const step of draft) {
                if (step.timer > 0) {
                    step.timer--;
                } else if (step.timer === 0) {
                    // if setup && has input -> prod
                    // if setup && has no input -> idle
                    // if idle && has input -> prod
                    // if prod && has no input -> idle

                    // TODO add a list of resource updates
                }
            }
        });

        // TODO update resource visuals

        if (minutes === dayDuration) {
            changePace(ctx, 0);
        }
        ctx.timeMinutes.value = minutes;
    };
}

export function changePace(ctx: FactoryState, pace: number) {
    if (pace < 0 || pace > 2) {
        console.error(`Impossible value of pace: ${pace}`);
        return;
    }

    if (ctx.pace.value === pace) {
        return;
    }

    if (pace > 0) {
        if (ctx.timeMinutes.value === dayDuration) {
            ctx.timeMinutes.value = 0;
            ctx.day.value += 1;
            if (ctx.day.value > 5) {
                ctx.day.value = 1;
                ctx.week.value += 1;
            }
        }
    }

    ctx.pace.value = pace;
    if (ctx.intervalId !== null) {
        clearInterval(ctx.intervalId);
    }

    if (pace > 0) {
        ctx.intervalId = setInterval(step(ctx), pace === 1 ? 500 : 200);
    }
}

export function buyRawMaterial(
    ctx: FactoryState,
    stepId: string,
    amount: number,
) {
    const stepIndex = findStepIndex(ctx, stepId);
    const cost = ctx.steps.value[stepIndex].rawMaterial.cost * amount;

    if (ctx.cash.value < cost) {
        return false;
    }

    batch(() => {
        ctx.cash.value -= cost;
        ctx.steps.value = produce(ctx.steps.value, (draft) => {
            draft[stepIndex].rawMaterial.amount += amount;
        });
    });

    return true;
}

export function assignSelectedResource(
    ctx: FactoryState,
    stepId: string,
    resourceType: number,
) {
    if (ctx.selectedResource.value.type !== resourceType) {
        return false;
    }

    const stepIndex = findStepIndex(ctx, stepId);
    if (stepIndex < 0) {
        return false;
    }

    if (isStepAssigned(ctx.steps.value[stepIndex])) {
        return false;
    }

    const resIndex = findResourceIndex(ctx, ctx.selectedResourceId.value);

    batch(() => {
        ctx.steps.value = produce(ctx.steps.value, (draft) => {
            const selectedResource = ctx.selectedResource.value;

            // remove resource from previous step
            if (selectedResource.position) {
                const prevIndex = ctx.steps.value.findIndex((s) =>
                    posEq(s.position, selectedResource.position),
                );

                if (prevIndex >= 0) {
                    draft[prevIndex].resourceId = undefined;
                }
            }

            // add resource to a new step
            const step = draft[stepIndex];
            step.resourceId = ctx.selectedResourceId.value;
            step.setupTime = selectedResource.setupTime;
            step.state = 'setup';
            step.timer = step.setupTime;
            draft[stepIndex] = step;
        });

        // set resource's properties
        ctx.resources.value = produce(ctx.resources.value, (draft) => {
            draft[resIndex].state = 'setup';
            draft[resIndex].position = ctx.steps.value[stepIndex].position;
        });
    });

    return true;
}
