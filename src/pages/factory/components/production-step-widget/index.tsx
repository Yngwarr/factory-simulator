import { resourceColor } from '@/utils';
import { assignSelectedResource, factoryState } from '@factory/model';
import { posEq, type Position, type ProductionStep } from '@factory/utils';
import classNames from 'classnames';
import { Banknote, ChevronsUp, Package, Pickaxe, Timer } from 'lucide-preact';
import { useContext } from 'preact/hooks';

type Props = {
    step: ProductionStep;
    dimensions: Position;
};

function shouldDuck(ctx: FactoryState, position: Position) {
    return ctx.hoveredResourcePosition.value !== null &&
        !posEq(position, ctx.hoveredResourcePosition.value);
}

export function ProductionStepWidget({ step, dimensions }: Props) {
    const {
        id,
        resourceType,
        position,
        rawMaterial,
        finishedProduct,
        resourceId,
    } = step;
    const ctx = useContext(factoryState);

    const handleClick = () => {
        const success = assignSelectedResource(ctx, id, resourceType);
        if (success) {
            ctx.selectedResourceId.value = null;
        }
    };

    return (
        <div
            style={{
                transition: 'filter .5s'
            }}
            className={classNames([
                `ik-grid-x-${position.x}`,
                `ik-grid-y-${dimensions.y - position.y}`,
                'flex',
                'flex-col',
                'justify-center',
                'items-center',
                'select-none',
                shouldDuck(ctx, position) && 'grayscale',
            ])}
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
                className={classNames(
                    'bg-white',
                    'text-black',
                    'rounded-t',
                    'mx-3',
                    'w-16',
                    'px-2',
                    'py-1',
                    resourceId && [
                        resourceColor(resourceType, 'border'),
                        'border-t-4',
                        'border-r-4',
                        'border-l-4',
                    ],
                )}
            >
                <Package className="inline" />
                {step.leftover}
            </div>

            <div
                className={classNames(
                    resourceColor(resourceType),
                    'rounded-b',
                    'mx-3',
                    'w-16',
                    'px-2',
                    'py-1',
                )}
            >
                <Timer className="inline" />
                {step.productionTime}
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
