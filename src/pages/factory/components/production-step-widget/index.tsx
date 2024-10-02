import { resourceColor } from '@/utils';
import type { Position, ProductionStep } from '@factory/utils';
import { Banknote, ChevronsUp, Package, Pickaxe, Timer } from 'lucide-preact';

type Props = {
    step: ProductionStep;
    dimensions: Position;
};

export function ProductionStepWidget({ step, dimensions }: Props) {
    const { id, resource, position, rawMaterial, finishedProduct } = step;

    const handleClick = () => {
        console.log("step pressed ", id)
    };

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
            onClick={handleClick}
        >
            {finishedProduct && (
                <div
                    style={{
                        backgroundColor: '#1c1b22',
                    }}
                    className={[
                        'text-white',
                        'rounded',
                        'border-2',
                        'border-white',
                        'mx-3',
                        'px-2',
                        'py-1',
                    ].join(' ')}
                >
                    <ChevronsUp className="inline" />
                    {finishedProduct.demand}
                    <Banknote className="inline px-1" />
                    {finishedProduct.cost}
                </div>
            )}

            <div
                className={[
                    'bg-white',
                    'text-black',
                    'rounded-t',
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
                    'rounded-b',
                    'mx-3',
                    'w-16',
                    'px-2',
                    'py-1',
                ].join(' ')}
            >
                <Timer className="inline" />
                {step.time}
            </div>

            {rawMaterial && (
                <div
                    className={[
                        'bg-gray-200',
                        'text-black',
                        'rounded',
                        'border-2',
                        'border-gray-400',
                        'mx-3',
                        'px-2',
                        'py-1',
                    ].join(' ')}
                >
                    <Pickaxe className="inline" />
                    {rawMaterial.amount}
                    <Banknote className="inline px-1" />
                    {rawMaterial.cost}
                </div>
            )}
        </div>
    );
}
