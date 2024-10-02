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
    const steps = signal<ProductionStep[]>(
        factoryDesc.steps.map((x) => {
            x.id = uuid();
            return x;
        }),
    );

    return {
        // TODO make it Resource[]
        resources: signal<Resource[][]>(
            factoryDesc.resources.map(createResource),
        ),
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
    };
}
