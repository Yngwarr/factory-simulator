import { signal } from '@preact/signals';
import { createContext, type RefObject } from 'preact';

export type AppState = ReturnType<typeof createAppState> | null;

export const appState = createContext<AppState>(null);

export function createAppState() {
    const gridRect = signal<DOMRect>();
    const gridRef = signal<RefObject<any>>();

    return { gridRect, gridRef };
}

export function updateGridRect(ctx: AppState) {
    ctx.gridRect.value = ctx.gridRef.value.current.getBoundingClientRect();
}
