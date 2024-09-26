import { createEvent, createStore, sample } from "effector";

const setRect = createEvent<DOMRect>();

const $rect = createStore<DOMRect>(new DOMRect());

sample({
    clock: setRect,
    target: $rect
});

export const $$canvasModel = {
    setRect,
    $rect
}
