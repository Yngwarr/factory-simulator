import { createEvent } from 'effector';

const windowResize = createEvent<void>();

export const $$appModel = {
    windowResize,
};
