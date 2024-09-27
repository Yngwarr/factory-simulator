import { createEvent, createStore, sample } from 'effector';
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
const $steps = createStore<ProductionStep[]>(defaultSteps);
const $links = createStore<ProductionLink[]>(defaultLinks);
const $week = createStore<number>(1);
const $day = createStore<number>(1);
const $timeMinutes = createStore<number>(0);
const $cash = createStore<number>(10000);
const $fixedExpenses = createStore<number>(11000);

const $dimensions = createStore<Position>(dimensionsFromSteps(defaultSteps));

const addCash = createEvent<number>();

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
    addCash,
};
