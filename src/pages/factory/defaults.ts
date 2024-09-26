import type {
    ProductionLink,
    ProductionStep,
    RawMaterial,
    ResourceDesc,
} from './utils';

export const defaultResources: ResourceDesc[] = [
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
];

export const defaultRawMaterials: RawMaterial[] = [
    { x: 0, amount: 65, cost: 20 },
    { x: 2, amount: 65, cost: 15 },
    { x: 4, amount: 35, cost: 60 },
    { x: 5, amount: 30, cost: 35 },
];

export const defaultSteps: ProductionStep[] = [
    {
        position: { x: 0, y: 0 },
        resource: 1,
        time: 4,
        leftover: 0,
    },
    {
        position: { x: 2, y: 0 },
        resource: 1,
        time: 5,
        leftover: 0,
    },
    {
        position: { x: 4, y: 0 },
        resource: 2,
        time: 9,
        leftover: 0,
    },
    {
        position: { x: 5, y: 0 },
        resource: 1,
        time: 15,
        leftover: 0,
    },
    {
        position: { x: 1, y: 1 },
        resource: 4,
        time: 8,
        leftover: 0,
    },
    {
        position: { x: 4, y: 1 },
        resource: 3,
        time: 18,
        leftover: 0,
    },
    {
        position: { x: 5, y: 1 },
        resource: 2,
        time: 12,
        leftover: 0,
    },
    {
        position: { x: 0, y: 2 },
        resource: 1,
        time: 15,
        leftover: 0,
    },
    {
        position: { x: 2, y: 2 },
        resource: 0,
        time: 6,
        leftover: 0,
    },
    {
        position: { x: 4, y: 2 },
        resource: 0,
        time: 28,
        leftover: 0,
    },
    {
        position: { x: 5, y: 2 },
        resource: 3,
        time: 30,
        leftover: 0,
    },
    {
        position: { x: 0, y: 3 },
        resource: 2,
        time: 15,
        leftover: 0,
    },
    {
        position: { x: 3, y: 3 },
        resource: 4,
        time: 9,
        leftover: 0,
    },
    {
        position: { x: 5, y: 3 },
        resource: 0,
        time: 14,
        leftover: 0,
    },
    {
        position: { x: 0, y: 4 },
        resource: 3,
        time: 20,
        leftover: 0,
    },
    {
        position: { x: 5, y: 5 },
        resource: 3,
        time: 7,
        leftover: 0,
    },
    {
        position: { x: 0, y: 6 },
        resource: 2,
        time: 18,
        leftover: 0,
    },
    {
        position: { x: 3, y: 6 },
        resource: 2,
        time: 6,
        leftover: 0,
    },
    {
        position: { x: 5, y: 6 },
        resource: 2,
        time: 10,
        leftover: 0,
    },
];

export const defaultLinks: ProductionLink[] = [
    { from: { x: 0, y: 0 }, to: { x: 1, y: 1 } },
    { from: { x: 0, y: 2 }, to: { x: 0, y: 3 } },
    { from: { x: 0, y: 3 }, to: { x: 0, y: 4 } },
    { from: { x: 0, y: 4 }, to: { x: 0, y: 6 } },
    { from: { x: 1, y: 1 }, to: { x: 0, y: 2 } },
    { from: { x: 1, y: 1 }, to: { x: 2, y: 2 } },
    { from: { x: 2, y: 0 }, to: { x: 1, y: 1 } },
    { from: { x: 2, y: 2 }, to: { x: 3, y: 3 } },
    { from: { x: 3, y: 3 }, to: { x: 3, y: 6 } },
    { from: { x: 4, y: 0 }, to: { x: 4, y: 1 } },
    { from: { x: 4, y: 1 }, to: { x: 4, y: 2 } },
    { from: { x: 4, y: 2 }, to: { x: 3, y: 3 } },
    { from: { x: 5, y: 0 }, to: { x: 5, y: 1 } },
    { from: { x: 5, y: 1 }, to: { x: 5, y: 2 } },
    { from: { x: 5, y: 2 }, to: { x: 5, y: 3 } },
    { from: { x: 5, y: 3 }, to: { x: 5, y: 5 } },
    { from: { x: 5, y: 5 }, to: { x: 5, y: 6 } },
];
