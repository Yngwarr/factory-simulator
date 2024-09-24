import { FastForward, Pause, Play } from 'lucide-preact';

function ControlButton({ children }) {
    return (<button type="button">{children}</button>);
}

export function ControlWidget() {
    return (
        <div>
            <ControlButton>
                <Pause />
            </ControlButton>
            <ControlButton>
                <Play />
            </ControlButton>
            <ControlButton>
                <FastForward />
            </ControlButton>
        </div>
    );
}
