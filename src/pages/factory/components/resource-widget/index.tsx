import { resourceColor } from '../../../../utils';
import { renderPosition, type Resource } from '../../utils';

type Props = { resource: Resource };

export function ResourceWidget({ resource }: Props) {
    const { type, state, position } = resource;

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
                'h-14'
            ].join(' ')}
        >
            <div className={'text-center'}>{renderPosition(position)}</div>
            <div className={'text-center'}>{state}</div>
        </div>
    );
}
