import { resourceColor } from '../../../../utils';
import { renderPosition, type Resource } from '../../utils';
import { useUnit } from 'effector-react';
import { $$factoryModel } from '@factory/model';

type Props = { resource: Resource };

export function ResourceWidget({ resource }: Props) {
    const { type, state, position, id } = resource;
    const { $selectedResource: selectedResource, selectResource } = useUnit($$factoryModel);

    const selected = selectedResource === id;
    const handleClick = () => {
        if (selected) {
            selectResource(null);
        } else {
            selectResource(id);
        }
    };

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
        >
            <div className={'text-center'}>{renderPosition(position)}</div>
            <div className={'text-center'}>{state}</div>
        </div>
    );
}
