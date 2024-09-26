import { useGate, useUnit } from 'effector-react';
import { ProductionStepWidget } from '../production-step-widget';
import { $$factoryModel } from '@factory/model';
import { createRef } from 'preact';
import { windowGate } from '../grid-canvas/model';

export function ProductionChain() {
    const { $steps: steps, $dimensions: dimensions } = useUnit($$factoryModel);
    const ref = createRef();

    useGate(windowGate, ref);

    return (
        <div ref={ref}>
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
