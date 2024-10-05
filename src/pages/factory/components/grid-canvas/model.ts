import { v4 as uuid } from 'uuid';
import type { Position } from '@factory/utils';
import { signal } from '@preact/signals';
import { produce } from 'immer';
import type { FactoryState } from '@factory/model';

type Material = {
    id: string;
    from: Position;
    to: Position;
    position: Position;
    type: number;
    timeTotal: number;
    elapsed: number;
};

export function createGridState() {
    return {
        materials: signal<Material[]>([]),
        free: [] as string[],
    };
}

function calculatePosition(from: Position, to: Position, progress: number) {
    return {
        x: from.x + (from.x - to.x) * progress,
        y: from.y + (from.y - to.y) * progress,
    };
}

export function tick(ctx: FactoryState) {
    const mats = ctx.materials.value;
    ctx.materials.value = mats.map((mat) => {
        if (mat.elapsed >= mat.timeTotal) {
            return mat;
        }

        const newElapsed = mat.elapsed + 1;

        mat.position = calculatePosition(
            mat.from,
            mat.to,
            newElapsed / mat.timeTotal,
        );

        if (newElapsed >= mat.timeTotal) {
            ctx.free.push(mat.id);
        }

        mat.elapsed = newElapsed;

        return mat;
    });
}

export function addMaterial(
    ctx: FactoryState,
    from: Position,
    to: Position,
    type: number,
    timeTotal: number,
) {
    ctx.materials.value = produce(ctx.materials.value, (draft) => {
        const newMaterial: Material = {
            position: from,
            from,
            to,
            type,
            timeTotal,
            id: uuid(),
            elapsed: 0,
        };

        const freeId = ctx.free.pop();

        if (freeId === undefined) {
            draft.push(newMaterial);
        } else {
            const freeIndex = draft.findIndex((mat) => mat.id === freeId);
            draft[freeIndex].position = from;
            draft[freeIndex].from = from;
            draft[freeIndex].to = to;
            draft[freeIndex].type = type;
            draft[freeIndex].timeTotal = timeTotal;
            draft[freeIndex].elapsed = 0;
        }
    });
}
