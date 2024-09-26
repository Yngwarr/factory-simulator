import { createEvent, createStore, sample } from "effector";

const setRect = createEvent<DOMRect>();

const $rect = createStore<DOMRect>(new DOMRect());

sample({
    clock: setRect,
    fn: (rect) => {
        console.log(`${rect.x}, ${rect.y}, ${rect.width}, ${rect.height}`);
        return rect;
    },
    target: $rect
});

export const $$canvasModel = {
    setRect,
    $rect
}
