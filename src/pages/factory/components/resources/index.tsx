import { hashCode, renderTime } from '../../../../utils';
import { ResourceWidget } from '../resource-widget';
import { useContext } from 'preact/hooks';
import { factoryState } from '@factory/model';

export function Resources() {
    const ctx = useContext(factoryState);

    return (
        <div className="flex flex-col flex-nowrap gap-y-4">
            <h1>Resources</h1>
            {ctx.resources.value.map((rs) => (
                <div
                    className={[
                        'flex',
                        'flex-row',
                        'flex-nowrap',
                        'gap-x-4',
                        'content-center',
                    ].join(' ')}
                    key={hashCode(rs)}
                >
                    <span
                        style={{
                            verticalAlign: 'middle',
                            lineHeight: '3.5rem',
                        }}
                        className="w-12 h-14 text-center"
                    >
                        {renderTime(rs[0].setupTime)}
                    </span>
                    {rs.map((r) => (
                        <ResourceWidget
                            key={r.id}
                            resource={r}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
