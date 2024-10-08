import { v4 as uuid } from 'uuid';

export type Position = {
    x: number;
    y: number;
};

export type ResourceState = 'idle' | 'setup' | 'prod';

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
    inputs?: string[];
    outputs?: string[];
    position: Position;
    resourceType: number;
    resourceId?: string;
    productionTime: number;
    setupTime?: number;
    timer?: number;
    state?: ResourceState;
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

export type FactoryDesc = {
    cash: number;
    fixedExpenses: number;
    resources: ResourceDesc[];
    steps: ProductionStep[];
    links: ProductionLink[];
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

function mapIndex(pos: Position) {
    return pos.x << 16 | pos.y;
}

export function linkSteps(steps: ProductionStep[], links: ProductionLink[]) {
    const map = new Map<number, ProductionStep>();

    for (const step of steps) {
        map.set(mapIndex(step.position), step);
        step.inputs = [];
        step.outputs = [];
    }

    for (const link of links) {
        map.get(mapIndex(link.from)).outputs.push(map.get(mapIndex(link.to)).id);
        map.get(mapIndex(link.to)).inputs.push(map.get(mapIndex(link.from)).id);
    }
}

export function posEq(a: Position, b: Position) {
    if (a === null || b === null) return false;
    return a.x === b.x && a.y === b.y;
}

export function dimensionsFromSteps(steps: ProductionStep[]) {
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

export function renderPosition(position: Position) {
    if (position === undefined) {
        return '—';
    }

    return `(${position.x}, ${position.y})`;
}
