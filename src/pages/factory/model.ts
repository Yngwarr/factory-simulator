import { createStore } from 'effector';
import { createResource, type Resource } from './utils';

const resources = createStore<Resource[][]>([
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
        amount: 2,
    },
    {
        setupTime: 30,
        amount: 2,
    },
    {
        setupTime: 0,
        amount: 1,
    },
].map(createResource));

export const $$factoryModel = {
    resources,
};
