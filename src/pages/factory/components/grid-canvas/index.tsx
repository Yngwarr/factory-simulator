import { $$testingModel } from '@factory/model';
import type { Position } from '@factory/utils';
import { useUnit } from 'effector-react';
import { createRef } from 'preact';
import { useEffect } from 'preact/hooks';

type Props = {
    dimensions: Position;
};

export function GridCanvas({ dimensions }: Props) {
    const ref = createRef();
    const { setRect, $rect: rect } = useUnit($$testingModel);

    useEffect(() => {
        const newRect = ref.current.getBoundingClientRect();
        // if (
        //     newRect.x === rect.x &&
        //     newRect.y === rect.y &&
        //     newRect.width === rect.width &&
        //     newRect.height === rect.height
        // ) {
        //     return;
        // }
        setRect(newRect);
    }, [ref, setRect]);

    const stepX = rect?.width / (dimensions.x + 1);
    const stepY = rect?.width / (dimensions.y + 1);

    const width = rect?.width;
    const height = rect?.height;

    return (
        <svg
            ref={ref}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className={[
                'w-full',
                'h-full',
                'underlay',
                `ik-grid-wide-x-${dimensions.x}`,
                `ik-grid-wide-y-${dimensions.y}`,
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
