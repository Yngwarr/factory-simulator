import { resourceColor } from '@/utils';
import {
    type FactoryState,
    assignSelectedResource,
    buyRawMaterial,
    factoryState,
} from '@factory/model';
import { type Position, type ProductionStep, posEq } from '@factory/utils';
import classNames from 'classnames';
import {
    Banknote,
    ChevronsUp,
    Package,
    Pickaxe,
    Settings,
    Timer,
} from 'lucide-preact';
import { useContext, useState } from 'preact/hooks';

type Props = {
    step: ProductionStep;
    dimensions: Position;
};

function shouldDuck(ctx: FactoryState, position: Position) {
    return (
        ctx.hoveredResourcePosition.value !== null &&
        !posEq(position, ctx.hoveredResourcePosition.value)
    );
}

type ProgressBarProps = {
    progress: number;
    resourceType: number;
    className: string;
};

function ProgressBar({ progress, resourceType, className }: ProgressBarProps) {
    return (
        <div
            className={classNames([
                className,
                'absolute',
                'bg-[#808080]',
                'w-16',
                'h-2',
                'rounded-md',
                // 'border',
                // 'border-[#808080]'
            ])}
        >
            <div
                style={{ width: `${100 * progress}%` }}
                className={classNames([
                    resourceColor(resourceType),
                    'h-full',
                    'rounded-md',
                ])}
            />
        </div>
    );
}

function AddRawButton({ ctx, stepId, amount }) {
    const handleClick = () => {
        buyRawMaterial(ctx, stepId, amount);
    };

    return (
        <button
            className={classNames([
                'border-2',
                'border-black',
                'p-1',
                'rounded-md',
                'bg-gray-200',
                'hover:bg-gray-300',
                'hover:shadow',
                'active:bg-gray-400',
                'active:scale-90',
                'transition-colors',
                'transition-shadow',
            ])}
            type="button"
            onClick={handleClick}
        >
            +{amount}
        </button>
    );
}

export function ProductionStepWidget({ step, dimensions }: Props) {
    const {
        id,
        resourceType,
        position,
        rawMaterial,
        finishedProduct,
        resourceId,
        state,
        timer,
        setupTime,
    } = step;
    const ctx = useContext(factoryState);

    const [alterRaw, setAlterRaw] = useState(false);

    const handleClick = () => {
        if (ctx.selectedResourceId.value === null) {
            if (resourceId) {
                ctx.selectedResourceId.value = resourceId;
            }
            return;
        }

        const success = assignSelectedResource(ctx, id, resourceType);
        if (success) {
            ctx.selectedResourceId.value = null;
        }
    };

    const handleRawClick = () => {
        setAlterRaw(!alterRaw);
    };

    const handleEnter = () => {
        if (!resourceId) return;
        ctx.hoveredStepPosition.value = position;
    };

    const handleLeave = () => {
        if (!resourceId) return;
        ctx.hoveredStepPosition.value = null;
    };

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

            {state === 'setup' && resourceId && setupTime !== 0 && (
                <ProgressBar
                    className={
                        finishedProduct
                            ? 'translate-y-16'
                            : rawMaterial
                              ? '-translate-y-16'
                              : '-translate-y-11'
                    }
                    progress={1 - timer / setupTime}
                    resourceType={resourceType}
                />
            )}

            <div
                className={classNames(
                    'flex',
                    'flex-row',
                    'flex-nowrap',
                    'gap-x-1',
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
                    'flex',
                    'flex-row',
                    'flex-nowrap',
                    'items-center',
                    'gap-x-1',
                )}
                onClick={handleClick}
            >
                {state === 'prod' ? (
                    <Settings
                        className={classNames([
                            'inline',
                            ctx.pace.value > 0 && 'spinning',
                        ])}
                    />
                ) : (
                    <Timer className="inline" />
                )}

                {step.productionTime}
            </div>

            {rawMaterial && (
                <>
                    {alterRaw && (
                        <div
                            className={classNames([
                                'absolute',
                                'px-4',
                                'py-2',
                                'flex',
                                'flex-row',
                                'flex-nowrap',
                                'items-center',
                                'text-black',
                                'gap-x-2',
                                '-translate-y-2',
                            ])}
                        >
                            <AddRawButton
                                amount={1}
                                ctx={ctx}
                                stepId={id}
                            />
                            <AddRawButton
                                amount={5}
                                ctx={ctx}
                                stepId={id}
                            />
                            <AddRawButton
                                amount={10}
                                ctx={ctx}
                                stepId={id}
                            />
                        </div>
                    )}
                    <div
                        className={classNames([
                            'flex',
                            'flex-row',
                            'flex-nowrap',
                            'items-center',
                            'gap-x-1',
                            'bg-gray-200',
                            'text-black',
                            'rounded',
                            'border-2',
                            'border-gray-400',
                            'mx-3',
                            'px-2',
                            'py-1',
                        ])}
                        onClick={handleRawClick}
                    >
                        <Pickaxe className="inline" />
                        {rawMaterial.amount}
                        <Banknote className="inline" />
                        {rawMaterial.cost}
                    </div>
                </>
            )}
        </div>
    );
}
