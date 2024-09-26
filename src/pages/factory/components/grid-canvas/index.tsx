import { useUnit } from 'effector-react';
import { $$canvasModel } from './model';
import { $$factoryModel } from '@factory/model';

export function GridCanvas() {
    const { $rect: rect } = useUnit($$canvasModel);
    const { $dimensions: dimensions } = useUnit($$factoryModel);

    const stepX = rect?.width / (dimensions.x + 1);
    const stepY = rect?.width / (dimensions.y + 1);

    const width = rect?.width;
    const height = rect?.height;

    return (
        <svg
            style={{
                width,
                height,
                left: rect?.left,
                top: rect?.top
            }}
            // viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className={[
                'absolute',
                'underlay',
            ].join(' ')}
        >
            {[...Array(dimensions.x + 2).keys()].map((x) => {
                const pos = stepX * x;
                return (
                    <line
                        key={pos}
                        x1={pos}
                        y1={0}
                        x2={pos}
                        y2={height}
                        stroke="grey"
                        strokeWidth={3}
                    />
                );
            })}

            {[...Array(dimensions.y + 2).keys()].map((y) => {
                const pos = stepY * y;
                return (
                    <line
                        key={pos}
                        x1={0}
                        y1={pos}
                        x2={width}
                        y2={pos}
                        stroke="grey"
                        strokeWidth={3}
                    />
                );
            })}
        </svg>
    );
}
