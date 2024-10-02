import { ProductionStepWidget } from '../production-step-widget';
import { createRef } from 'preact';
import { useContext } from 'preact/hooks';
import { appState } from '@/signals';
import { factoryState } from '@factory/signals';

export function ProductionChain() {
    const { gridRef } = useContext(appState);
    const { steps, dimensions } = useContext(factoryState);

    gridRef.value = createRef();

    return (
        <div ref={gridRef.value}>
            <div
                className={[
                    'grid',
                    'w-full',
                    'h-full',
                    `ik-grid-c${dimensions.value.x + 1}`,
                    `ik-grid-r${dimensions.value.y + 1}`,
                ].join(' ')}
            >
                {steps.value.map((step) => (
                    <ProductionStepWidget
                        key={JSON.stringify(step.position)}
                        step={step}
                        dimensions={dimensions.value}
                    />
                ))}
            </div>
        </div>
    );
}
