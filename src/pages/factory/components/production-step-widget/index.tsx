import { Package, Timer } from 'lucide-preact';
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
                `ik-grid-x-${position.x}`,
                `ik-grid-y-${dimensions.y - position.y}`,
                'flex',
                'flex-col',
                'justify-center',
                'items-center',
            ].join(' ')}
        >
            <div
                className={[
                    'bg-white',
                    'text-black',
                    'rounded',
                    'mx-3',
                    'w-16',
                    'px-2',
                    'py-1',
                ].join(' ')}
            >
                <Package className="inline" />
                {step.leftover}
            </div>
            <div
                className={[
                    resourceColor(resource),
                    'rounded',
                    'mx-3',
                    'w-16',
                    'px-2',
                    'py-1',
                ].join(' ')}
            >
                <Timer className="inline" />
                {step.time}
            </div>
        </div>
    );
}
