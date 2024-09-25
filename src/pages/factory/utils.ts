import { v4 as uuid } from 'uuid';

type Position = {
    x: number;
    y: number;
};

type ResourceState = 'standby' | 'idle' | 'setup' | 'producing';

type ResourceDesc = {
    setupTime: number;
    amount: number;
};

export type Resource = {
    id: string;
    type: number;
    setupTime: number;
    state: ResourceState;
    position: Position;
    timer: number;
};

export function createResource({ setupTime, amount }: ResourceDesc, resourceType: number): Resource[] {
    const result = [];

    for (let i = 0; i < amount; ++i) {
        result.push({
            id: uuid(),
            type: resourceType,
            setupTime,
            state: 'standby',
            position: { x: 0, y: 0 },
            timer: 0,
        });
    }

    return result;
}
