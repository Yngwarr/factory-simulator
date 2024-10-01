import { v4 as uuid } from 'uuid';

export type Position = {
    x: number;
    y: number;
};

type ResourceState = 'idle' | 'setup' | 'prod';

export type ResourceDesc = {
    setupTime: number;
    amount: number;
};

export type Resource = {
    id: string;
    type: number;
    setupTime: number;
    state: ResourceState;
    position?: Position;
};

export type ProductionStep = {
    id?: string;
    position: Position;
    resource: number;
    time: number;
    leftover: number;
    rawMaterial?: {
        cost: number;
        amount: number;
    };
    finishedProduct?: {
        cost: number;
        demand: number;
    };
};

export type ProductionLink = {
    from: Position;
    to: Position;
};

export function createResource(
    { setupTime, amount }: ResourceDesc,
    resourceType: number,
): Resource[] {
    const result = [];

    for (let i = 0; i < amount; ++i) {
        result.push({
            id: uuid(),
            type: resourceType,
            setupTime,
            state: 'idle',
        });
    }

    return result;
}

export function renderPosition(position: Position) {
    if (position === undefined) {
        return '—';
    }

    return `(${position.x}, ${position.y})`;
}
