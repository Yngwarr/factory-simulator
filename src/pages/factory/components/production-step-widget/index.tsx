import { resourceColor } from '../../../../utils';
import type { Position, ProductionStep } from '../../utils';

type Props = {
    step: ProductionStep;
    dimensions: Position;
};

export function ProductionStepWidget({ step, dimensions }: Props) {
    const { resource, position } = step;

    return (
        <div
            className={[
                resourceColor(resource),
                `ik-grid-x-${position.x}`,
                `ik-grid-y-${dimensions.y - position.y}`,
            ].join(' ')}
        >
            {step.time}
        </div>
    );
}
