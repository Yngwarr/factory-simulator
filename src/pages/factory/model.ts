import { createStore, sample } from 'effector';
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

const $resources = createStore<Resource[][]>(defaultResources.map(createResource));
const $steps = createStore<ProductionStep[]>(defaultSteps);
const $links = createStore<ProductionLink[]>(defaultLinks);

const $dimensions = createStore<Position>(dimensionsFromSteps(defaultSteps));

sample({
    clock: $steps,
    fn: dimensionsFromSteps,
    target: $dimensions,
});

export const $$factoryModel = {
    $resources,
    $steps,
    $links,
    $dimensions
};
