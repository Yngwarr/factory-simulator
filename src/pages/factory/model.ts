import { createStore } from 'effector';

type Position = {
    x: number;
    y: number;
};

type ResourceState = "idle" | "setup" | "producing";

type ResourceDesc = {
    setupTime: number;
    amount: number;
    state?: ResourceState;
    position?: Position;
    // for "setup" and "producing"
    timer?: number;
};

const resources = createStore<ResourceDesc[]>([
    {
        setupTime: 15,
        amount: 1,
    },
    {
        setupTime: 120,
        amount: 2,
    },
    {
        setupTime: 60,
        amount: 2
    },
    {
        setupTime: 30,
        amount: 2
    },
    {
        setupTime: 0,
        amount: 1
    },
]);

export const $$factoryModel = {
    resources
};
