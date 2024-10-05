import { v4 as uuid } from 'uuid';
import { posEq, type Position } from '@factory/utils';
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
    hidden: boolean;
};

export function createGridState() {
    return {
        materials: signal<Material[]>([]),
        freeMaterials: [] as string[],
        materialsToHide: [] as Position[]
    };
}

function calculatePosition(from: Position, to: Position, progress: number) {
    return {
        x: from.x + (to.x - from.x) * progress,
        y: from.y + (to.y - from.y) * progress,
    };
}

export function tick(ctx: FactoryState) {
    const mats = ctx.materials.value;
    ctx.materials.value = mats.map((mat) => {
        if (ctx.materialsToHide.some((hiddenPos) => posEq(hiddenPos, mat.to))) {
            mat.hidden = true;
            ctx.freeMaterials.push(mat.id);
            return mat;
        }

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
            ctx.freeMaterials.push(mat.id);
        }

        mat.elapsed = newElapsed;

        return mat;
    });

    ctx.materialsToHide = [];
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
            hidden: false
        };

        const freeId = ctx.freeMaterials.pop();

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
            draft[freeIndex].hidden = false;
        }
    });
}
