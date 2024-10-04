import type { FactoryDesc } from './utils';

export const defaultFactory: FactoryDesc = {
    cash: 10000,
    fixedExpenses: 11000,
    resources: [
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
    ],
    steps: [
        {
            position: { x: 0, y: 0 },
            resourceType: 1,
            productionTime: 4,
            leftover: 0,
            rawMaterial: {
                cost: 30,
                amount: 0,
            },
        },
        {
            position: { x: 2, y: 0 },
            resourceType: 1,
            productionTime: 5,
            leftover: 0,
            rawMaterial: {
                cost: 35,
                amount: 0,
            },
        },
        {
            position: { x: 4, y: 0 },
            resourceType: 2,
            productionTime: 9,
            leftover: 0,
            rawMaterial: {
                cost: 30,
                amount: 0,
            },
        },
        {
            position: { x: 5, y: 0 },
            resourceType: 1,
            productionTime: 15,
            leftover: 0,
            rawMaterial: {
                cost: 65,
                amount: 0,
            },
        },
        {
            position: { x: 1, y: 1 },
            resourceType: 4,
            productionTime: 8,
            leftover: 25,
        },
        {
            position: { x: 4, y: 1 },
            resourceType: 3,
            productionTime: 18,
            leftover: 15,
        },
        {
            position: { x: 5, y: 1 },
            resourceType: 2,
            productionTime: 12,
            leftover: 0,
        },
        {
            position: { x: 0, y: 2 },
            resourceType: 1,
            productionTime: 15,
            leftover: 0,
        },
        {
            position: { x: 2, y: 2 },
            resourceType: 0,
            productionTime: 6,
            leftover: 0,
        },
        {
            position: { x: 4, y: 2 },
            resourceType: 0,
            productionTime: 28,
            leftover: 0,
        },
        {
            position: { x: 5, y: 2 },
            resourceType: 3,
            productionTime: 20,
            leftover: 10,
        },
        {
            position: { x: 0, y: 3 },
            resourceType: 2,
            productionTime: 15,
            leftover: 0,
        },
        {
            position: { x: 3, y: 3 },
            resourceType: 4,
            productionTime: 9,
            leftover: 0,
        },
        {
            position: { x: 5, y: 3 },
            resourceType: 0,
            productionTime: 14,
            leftover: 0,
        },
        {
            position: { x: 0, y: 4 },
            resourceType: 3,
            productionTime: 20,
            leftover: 0,
        },
        {
            position: { x: 5, y: 5 },
            resourceType: 3,
            productionTime: 7,
            leftover: 0,
        },
        {
            position: { x: 0, y: 6 },
            resourceType: 2,
            productionTime: 18,
            leftover: 0,
            finishedProduct: {
                cost: 180,
                demand: 40,
            },
        },
        {
            position: { x: 3, y: 6 },
            resourceType: 2,
            productionTime: 6,
            leftover: 0,
            finishedProduct: {
                cost: 240,
                demand: 50,
            },
        },
        {
            position: { x: 5, y: 6 },
            resourceType: 2,
            productionTime: 10,
            leftover: 0,
            finishedProduct: {
                cost: 180,
                demand: 40,
            },
        },
    ],
    links: [
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
    ],
};
