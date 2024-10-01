import { createEvent, createStore, sample } from 'effector';
import { v4 as uuid } from 'uuid';
import {
    createResource,
    type ProductionLink,
    type Position,
    type ProductionStep,
    type Resource,
} from './utils';
import { defaultLinks, defaultResources, defaultSteps } from './defaults';

function dimensionsFromSteps(steps: ProductionStep[]) {
    const dimensions = { x: 0, y: 0 };

    for (const step of steps) {
        const pos = step.position;

        if (pos.x > dimensions.x) {
            dimensions.x = pos.x;
        }

        if (pos.y > dimensions.y) {
            dimensions.y = pos.y;
        }
    }

    return dimensions;
}

const $resources = createStore<Resource[][]>(
    defaultResources.map(createResource),
);
const $steps = createStore<ProductionStep[]>(
    defaultSteps.map((x) => {
        x.id = uuid();
        return x;
    }),
);
const $links = createStore<ProductionLink[]>(defaultLinks);
const $week = createStore<number>(1);
const $day = createStore<number>(1);
const $timeMinutes = createStore<number>(0);
const $cash = createStore<number>(10000);
const $fixedExpenses = createStore<number>(11000);

const $dimensions = createStore<Position>(dimensionsFromSteps(defaultSteps));
const $selectedResource = createStore<string | null>(null);

const addCash = createEvent<number>();
const selectResource = createEvent<string | null>();
const selectStep = createEvent<string>();

sample({
    clock: $steps,
    fn: dimensionsFromSteps,
    target: $dimensions,
});

sample({
    clock: addCash,
    source: $cash,
    fn: (cash, addedValue) => cash + addedValue,
    target: $cash,
});

sample({
    clock: selectResource,
    target: $selectedResource,
});

sample({
    clock: selectStep,
    source: [$steps, $selectedResource, $resources],
    fn: ([steps, resourceId, resources]: [ProductionStep[], string, Resource[][]], stepId: string) => {
        if (resourceId === null) {
            return steps;
        }
        return steps;
    },
    target: $steps
})

export const $$factoryModel = {
    $resources,
    $steps,
    $links,
    $week,
    $day,
    $timeMinutes,
    $cash,
    $fixedExpenses,
    $dimensions,
    $selectedResource,
    addCash,
    selectResource,
    selectStep
};
