import { v4 as uuid } from 'uuid';
import { computed, signal } from '@preact/signals';
import { createContext } from 'preact';
import {
    createResource,
    type ProductionStep,
    type FactoryDesc,
    type Resource,
    dimensionsFromSteps,
    type Position,
} from './utils';

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

    return {
        resources,
        steps,
        week: signal(1),
        day: signal(1),
        timeMinutes: signal(0),
        cash: signal(factoryDesc.cash),
        selectedResource: signal<string | null>(null),

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
    };
}
