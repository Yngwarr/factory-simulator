import { FactoryState, factoryState } from '@factory/model';
import { useContext } from 'preact/hooks';
import { resourceColor } from '../../../../utils';
import { Position, type Resource, posEq, renderPosition } from '../../utils';
import classNames from 'classnames';

type Props = { resource: Resource };

function shouldDuck(ctx: FactoryState, position: Position) {
    return ctx.hoveredStepPosition.value !== null &&
        !(position && posEq(position, ctx.hoveredStepPosition.value));
}

export function ResourceWidget({ resource }: Props) {
    const { type, state, position, id } = resource;
    const ctx = useContext(factoryState);

    const selected = ctx.selectedResourceId.value === id;

    const handleClick = () => {
        ctx.selectedResourceId.value = selected ? null : id;
    };

    const handleEnter = () => {
        if (!position) return;
        ctx.hoveredResourcePosition.value = position;
    }

    const handleLeave = () => {
        if (!position) return;
        ctx.hoveredResourcePosition.value = null;
    }

    return (
        <div
            className={classNames(
                resourceColor(type),
                'rounded',
                'px-2',
                'flex',
                'flex-col',
                'justify-center',
                'ik-min-w-14',
                'h-14',
                'select-none',
                'ik-smooth-filter',
                selected && 'outline outline-4',
                shouldDuck(ctx, position) && 'grayscale'
            )}
            onClick={handleClick}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <div className={'text-center'}>{renderPosition(position)}</div>
            <div className={'text-center'}>{state}</div>
        </div>
    );
}
