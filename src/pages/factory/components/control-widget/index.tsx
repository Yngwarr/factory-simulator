import { FastForward, Pause, Play, StepForward } from 'lucide-preact';

function ControlButton({ children }) {
    return (
        <button
            className={[
                'border-2',
                'rounded-md',
                'p-2',
                'control-button',
                'hover:bg-gray-700',
                'active:bg-gray-600',
                'active:scale-90',
            ].join(' ')}
            type="button"
        >
            {children}
        </button>
    );
}

export function ControlWidget() {
    return (
        <div className="flex flex-row flex-nowrap items-start text-2xl gap-x-2">
            <ControlButton>
                <Pause size={32} />
            </ControlButton>
            <ControlButton>
                <Play size={32} />
            </ControlButton>
            <ControlButton>
                <StepForward size={32} />
            </ControlButton>
            <ControlButton>
                <FastForward size={32} />
            </ControlButton>
        </div>
    );
}
