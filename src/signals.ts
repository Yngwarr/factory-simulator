import { signal } from '@preact/signals';
import { createContext, type RefObject } from 'preact';

export type StateType = ReturnType<typeof createAppState> | null;

export const AppState = createContext<StateType>(null);

export function createAppState() {
    const gridRect = signal<DOMRect>();
    const gridRef = signal<RefObject<any>>();

    return { gridRect, gridRef };
}

export function setRect(context: StateType, rect: DOMRect) {
    context.gridRect.value = rect;
}
