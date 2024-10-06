import { factoryState } from '@factory/model';
import classNames from 'classnames';
import { X } from 'lucide-preact';
import { useContext } from 'preact/hooks';

function CloseButton({ onClick = () => {} }) {
    return (
        <button
            type="button"
            className={classNames([
                'rounded-lg',
                'p-2',
                'hover:bg-gray-700',
                'active:bg-gray-600',
                'active:scale-90',
            ])}
            onClick={onClick}
        >
            <X size={18} />
        </button>
    );
}

function ModalWindow({ children, shown = false }) {
    return (
        <div
            className={classNames([
                'ik-bg-color',
                'border-8',
                'border-double',
                'border-white',
                'p-4',
                !shown && 'hidden',
            ])}
        >
            {children}
        </div>
    );
}

export function Modals() {
    const { day, modals, anyModalOpen } = useContext(factoryState);

    const handleCloseDay = () => {
        modals.dayConcluded.value = false;
    };

    return (
        <div
            className={classNames([
                'absolute',
                'w-full',
                'h-full',
                'flex',
                'justify-center',
                'items-center',
                !anyModalOpen.value && 'hidden'
            ])}
        >
            <ModalWindow shown={modals.dayConcluded.value}>
                <div className="flex flex-row flex-nowrap justify-between items-baseline">
                    <h1>You've reached the end of day {day}</h1>
                    <CloseButton onClick={handleCloseDay} />
                </div>
                <p>
                    You've definitely earned something. Or lost, I didn't pay
                    attention.
                </p>
            </ModalWindow>
        </div>
    );
}
