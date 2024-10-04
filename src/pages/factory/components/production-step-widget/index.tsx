import { resourceColor } from '@/utils';
import { type FactoryState, assignSelectedResource, factoryState } from '@factory/model';
import { type Position, type ProductionStep, posEq } from '@factory/utils';
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
        if (ctx.selectedResourceId.value === null) {
            return;
        }

        const success = assignSelectedResource(ctx, id, resourceType);
        if (success) {
            ctx.selectedResourceId.value = null;
        }
    };

    const handleEnter = () => {
        if (!resourceId) return;
        ctx.hoveredStepPosition.value = position;
    }

    const handleLeave = () => {
        if (!resourceId) return;
        ctx.hoveredStepPosition.value = null;
    }

    return (
        <div
            className={classNames([
                `ik-grid-x-${position.x}`,
                `ik-grid-y-${dimensions.y - position.y}`,
                'flex',
                'flex-col',
                'justify-center',
                'items-center',
                'select-none',
                'ik-smooth-filter',
                shouldDuck(ctx, position) && 'grayscale',
            ])}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
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
                onClick={handleClick}
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
                onClick={handleClick}
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
