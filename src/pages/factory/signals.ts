import { createContext } from "preact";

export type FactoryState = ReturnType<typeof createFactoryState> | null;

export const factoryState = createContext<FactoryState>(null);

export function createFactoryState() {
}
