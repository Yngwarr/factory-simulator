import { resourceColor } from '../../../../utils';
import { renderPosition, type Resource } from '../../utils';
import { useContext } from 'preact/hooks';
import { factoryState } from '@factory/model';

type Props = { resource: Resource };

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
            className={[
                resourceColor(type),
                'rounded',
                'px-2',
                'flex',
                'flex-col',
                'justify-center',
                'ik-min-w-14',
                'h-14',
                'select-none',
                selected && 'outline outline-4',
            ].join(' ')}
            onClick={handleClick}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <div className={'text-center'}>{renderPosition(position)}</div>
            <div className={'text-center'}>{state}</div>
        </div>
    );
}
