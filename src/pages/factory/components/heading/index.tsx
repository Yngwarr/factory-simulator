import { ControlWidget } from '../control-widget';
import { InfoWidget } from '../info-widget';

type Props = {
    className: string;
};

export function Heading(props: Props) {
    return (
        <div
            className={`flex flex-row flex-nowrap justify-between ${props.className}`}
        >
            <InfoWidget />
            <ControlWidget />
        </div>
    );
}
