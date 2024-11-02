import { changePace, factoryState } from '@factory/model';
import classNames from 'classnames';
import { FastForward, Pause, Play } from 'lucide-preact';
import { useContext } from 'preact/hooks';

function ControlButton({ children, pace, hold = true }) {
    const ctx = useContext(factoryState);

    const handleClick = () => {
        changePace(ctx, pace);
    }

    return (
        <button
            className={classNames([
                'border-2',
                'rounded-md',
                'p-2',
                'control-button',
                'hover:bg-gray-700',
                'active:bg-gray-600',
                'active:scale-90',
                'text-white',
                hold && ctx.pace.value === pace && 'scale-90'
            ])}
            onClick={handleClick}
            type="button"
        >
            {children}
        </button>
    );
}

export function ControlWidget() {
    return (
        <div className="flex flex-row flex-nowrap items-start text-2xl gap-x-2">
            <ControlButton
                pace={0}
                hold={false}
            >
                <Pause size={32} />
            </ControlButton>
            <ControlButton pace={1}>
                <Play size={32} />
            </ControlButton>
            {/* <ControlButton> */}
            {/*     <StepForward size={32} /> */}
            {/* </ControlButton> */}
            <ControlButton pace={2}>
                <FastForward size={32} />
            </ControlButton>
        </div>
    );
}
