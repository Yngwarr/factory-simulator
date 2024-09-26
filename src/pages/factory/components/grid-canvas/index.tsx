import { $$factoryModel } from '@factory/model';
import { useUnit } from 'effector-react';
import { $$canvasModel, getCanvasPosition } from './model';
import { useEffect } from 'preact/hooks';
import { $$appModel } from '@/model';

export function GridCanvas() {
    const { $rect: rect } = useUnit($$canvasModel);
    const { $dimensions: dimensions, $links: links } = useUnit($$factoryModel);

    const stepX = 100 / (dimensions.x + 1);
    const stepY = 100 / (dimensions.y + 1);

    const width = rect?.width;
    const height = rect?.height;

    return (
        <svg
            style={{
                width,
                height,
                left: rect?.left,
                top: rect?.top,
            }}
            className={['absolute', 'underlay'].join(' ')}
        >
            {[...Array(dimensions.x + 2).keys()].map((x) => {
                const pos = stepX * x;
                return (
                    <line
                        key={pos}
                        x1={`${pos}%`}
                        y1={0}
                        x2={`${pos}%`}
                        y2={height}
                        stroke="#333"
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
                        y1={`${pos}%`}
                        x2={width}
                        y2={`${pos}%`}
                        stroke="#333"
                        strokeWidth={3}
                    />
                );
            })}

            {links.map((link) => {
                const from = getCanvasPosition(link.from, dimensions);
                const to = getCanvasPosition(link.to, dimensions);

                return (
                    <line
                        key={link}
                        x1={`${from.x}%`}
                        y1={`${from.y}%`}
                        x2={`${to.x}%`}
                        y2={`${to.y}%`}
                        stroke="grey"
                        strokeWidth={3}
                    />
                );
            })}
        </svg>
    );
}
