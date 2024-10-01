import { $$appModel } from '@/model';
import type { Position } from '@factory/utils';
import {
    attach,
    createEvent,
    createStore,
    sample,
} from 'effector';
import { createGate } from 'effector-react';
import type { RefObject } from 'preact';

export const windowGate = createGate<RefObject<any>>();

const setRect = createEvent<DOMRect>();

const $rect = createStore<DOMRect>(new DOMRect());
const $resizeRef = createStore<RefObject<any>>(undefined, { skipVoid: false });

const resizeFx = attach({
    source: $resizeRef,
    effect: (ref: RefObject<any>) => {
        setRect(ref.current.getBoundingClientRect());
    },
});

export function getCanvasPosition(position: Position, dimensions: Position) {
    const stepX = 100 / ((dimensions.x + 1) * 2);
    const stepY = 100 / ((dimensions.y + 1) * 2);

    return {
        x: (position.x * 2 + 1) * stepX,
        y: 100 - (position.y * 2 + 1) * stepY,
    };
}

sample({
    clock: windowGate.open,
    target: $resizeRef,
});

sample({
    clock: $$appModel.windowResize,
    target: resizeFx,
});

sample({
    clock: setRect,
    target: $rect,
});

export const $$canvasModel = {
    setRect,
    $rect,
};
