import { $$testingModel } from "@factory/model";
import { useUnit } from "effector-react";
import { createRef } from "preact";
import { useEffect } from "preact/hooks";

export function GridCanvas() {
    const ref = createRef();
    const { setRect, $rect: rect } = useUnit($$testingModel);

    useEffect(() => {
        setRect(ref.current.getBoundingClientRect());
    }, [ref, setRect]);

    const step = rect?.width / 6;
    const height = rect?.height;

    return (
        <svg
            ref={ref}
            className="w-full h-full testing"
        >
            <line
                x1={step}
                y1={0}
                x2={step}
                y2={height}
                stroke="red"
                strokeWidth={3}
            />
            <line
                x1={step * 2}
                y1={0}
                x2={step * 2}
                y2={height}
                stroke="red"
                strokeWidth={3}
            />
            <line
                x1={step * 3}
                y1={0}
                x2={step * 3}
                y2={height}
                stroke="red"
                strokeWidth={3}
            />
            <line
                x1={step * 4}
                y1={0}
                x2={step * 4}
                y2={height}
                stroke="red"
                strokeWidth={3}
            />
        </svg>
    );
}
