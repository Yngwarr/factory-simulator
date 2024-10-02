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
    ResourceState,
    posEq,
} from './utils';
import { produce } from 'immer';

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

export function assignSelectedResource(
    ctx: FactoryState,
    stepId: string,
    resourceType: number,
) {
    if (ctx.selectedResource.value.type !== resourceType) {
        return false;
    }

    const stepIndex = ctx.steps.value.findIndex((step) => step.id === stepId);
    if (stepIndex < 0) {
        return false;
    }

    const resIndex = ctx.resources.value.findIndex(
        (r) => r.id === ctx.selectedResourceId.value,
    );

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