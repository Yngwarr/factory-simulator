import { createEvent, createStore, sample } from 'effector';
import {
    createResource,
    type Position,
    type ProductionStep,
    type RawMaterial,
    type Resource,
} from './utils';
import { defaultRawMaterials, defaultResources, defaultSteps } from './defaults';

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

const $rawMaterials = createStore<RawMaterial[]>(defaultRawMaterials);

const $steps = createStore<ProductionStep[]>(defaultSteps);

const $dimensions = createStore<Position>(dimensionsFromSteps(defaultSteps));

sample({
    clock: $steps,
    fn: dimensionsFromSteps,
    target: $dimensions,
});

export const $$factoryModel = {
    $resources,
    $rawMaterials,
    $steps,
    $dimensions
};

export const $$testingModel = {
    $rect: createStore<DOMRect>(new DOMRect()),
    setRect: createEvent<DOMRect>()
}

sample({
    clock: $$testingModel.setRect,
    fn: (x) => {
        console.log(x.height);
        return x;
    },
    target: $$testingModel.$rect
});

