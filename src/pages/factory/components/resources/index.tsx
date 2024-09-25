import { useUnit } from 'effector-react';
import { $$factoryModel } from '../../model';
import { hashCode, renderTime } from '../../../../utils';
import { ResourceWidget } from '../resource-widget';

export function Resources() {
    const { resources } = useUnit($$factoryModel);

    return (
        <div className="flex flex-col flex-nowrap gap-y-4">
            <h1>Resources</h1>
            {resources.map((rs) => (
                <div
                    className="flex flex-row flex-nowrap gap-x-4"
                    key={hashCode(rs)}
                >
                    <div className="w-12">{renderTime(rs[0].setupTime)}</div>
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
