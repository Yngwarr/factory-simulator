import { useUnit } from 'effector-react';
import { ProductionStepWidget } from '../production-step-widget';
import { $$factoryModel } from '@factory/model';
import { createRef } from 'preact';
import { useContext } from 'preact/hooks';
import { AppState } from '@/signals';

export function ProductionChain() {
    const { $steps: steps, $dimensions: dimensions } = useUnit($$factoryModel);
    const { gridRef } = useContext(AppState)

    gridRef.value = createRef();

    return (
        <div ref={gridRef.value}>
            <div
                className={[
                    'grid',
                    'w-full',
                    'h-full',
                    `ik-grid-c${dimensions.x + 1}`,
                    `ik-grid-r${dimensions.y + 1}`,
                ].join(' ')}
            >
                {steps.map((step) => (
                    <ProductionStepWidget
                        key={JSON.stringify(step.position)}
                        step={step}
                        dimensions={dimensions}
                    />
                ))}
            </div>
        </div>
    );
}
