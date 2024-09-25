import { useUnit } from 'effector-react';
import { ProductionStepWidget } from '../production-step-widget';
import { $$factoryModel } from '@factory/model';
import { GridCanvas } from '../grid-canvas';

export function ProductionChain() {
    const { $steps: steps, $dimensions: dimensions } = useUnit($$factoryModel);

    return (
        <div>
            <div
                className={[
                    'grid',
                    'gap-6',
                    'w-full',
                    'h-full',
                    `ik-grid-c${dimensions.x + 1}`,
                    `ik-grid-r${dimensions.y + 1}`,
                ].join(' ')}
            >
                <GridCanvas />
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
