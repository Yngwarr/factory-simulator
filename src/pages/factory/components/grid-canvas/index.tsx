import { appState, updateGridRect } from '@/model';
import { resourceColor } from '@/utils';
import { factoryState } from '@factory/model';
import type { Position } from '@factory/utils';
import { useContext, useEffect } from 'preact/hooks';

const strokeWidth = 3;

function getCanvasPosition(position: Position, dimensions: Position) {
    const stepX = 100 / ((dimensions.x + 1) * 2);
    const stepY = 100 / ((dimensions.y + 1) * 2);

    return {
        x: (position.x * 2 + 1) * stepX,
        y: 100 - (position.y * 2 + 1) * stepY,
    };
}

export function GridCanvas() {
    const appCtx = useContext(appState);
    const { dimensions, links, materials } = useContext(factoryState);

    const rect = appCtx.gridRect;

    const stepX = 100 / (dimensions.value.x + 1);
    const stepY = 100 / (dimensions.value.y + 1);

    const width = rect?.value?.width;
    const height = rect?.value?.height;

    useEffect(() => {
        updateGridRect(appCtx);
    }, [appCtx]);

    return (
        <svg
            style={{
                width,
                height,
                left: rect?.value?.left,
                top: rect?.value?.top,
            }}
            className={['absolute', 'underlay'].join(' ')}
        >
            {[...Array(dimensions.value.x + 2).keys()].map((x) => {
                const pos = stepX * x;
                return (
                    <line
                        key={pos}
                        x1={`${pos}%`}
                        y1={0}
                        x2={`${pos}%`}
                        y2={height}
                        stroke="#333"
                        stroke-width={strokeWidth}
                    />
                );
            })}

            {[...Array(dimensions.value.y + 2).keys()].map((y) => {
                const pos = stepY * y;
                return (
                    <line
                        key={pos}
                        x1={0}
                        y1={`${pos}%`}
                        x2={width}
                        y2={`${pos}%`}
                        stroke="#333"
                        stroke-width={strokeWidth}
                    />
                );
            })}

            {links.map((link) => {
                const from = getCanvasPosition(link.from, dimensions.value);
                const to = getCanvasPosition(link.to, dimensions.value);

                return (
                    <line
                        key={link}
                        x1={`${from.x}%`}
                        y1={`${from.y}%`}
                        x2={`${to.x}%`}
                        y2={`${to.y}%`}
                        stroke="grey"
                        stroke-width={strokeWidth}
                    />
                );
            })}

            {materials.value.map((mat) => {
                const pos = getCanvasPosition(mat.position, dimensions.value);
                return (
                    <circle
                        key={mat.id}
                        cx={pos.x}
                        cy={pos.y}
                        r={10}
                        className={resourceColor(mat.type, "fill")}
                    />
                );
            })}
        </svg>
    );
}
