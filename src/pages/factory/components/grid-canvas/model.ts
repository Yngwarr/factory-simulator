import type { Position } from "@factory/utils";
import { createEvent, createStore, sample } from "effector";

const setRect = createEvent<DOMRect>();

const $rect = createStore<DOMRect>(new DOMRect());

export function getCanvasPosition(position: Position, dimensions: Position) {
    const stepX = 100 / ((dimensions.x + 1) * 2);
    const stepY = 100 / ((dimensions.y + 1) * 2);

    return {
        x: (position.x * 2 + 1) * stepX,
        y: 100 - (position.y * 2 + 1) * stepY,
    };
}

sample({
    clock: setRect,
    target: $rect
});

export const $$canvasModel = {
    setRect,
    $rect
}
