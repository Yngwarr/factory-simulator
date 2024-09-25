import { useUnit } from 'effector-react';
import { $$factoryModel } from '../../model';
import { ProductionStepWidget } from '../production-step-widget';

export function ProductionChain() {
    const { $steps: steps, $dimensions: dimensions } = useUnit($$factoryModel);

    return (
        <div
            className={[
                'grid',
                'gap-6',
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
    );
}
