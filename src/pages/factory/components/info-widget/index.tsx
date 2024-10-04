import { renderTime } from '@/utils';
import { factoryState } from '@factory/model';
import { Wallet } from 'lucide-preact';
import { useContext } from 'preact/hooks';

export function InfoWidget() {
    const { week, day, timeMinutes, cash, fixedExpenses } =
        useContext(factoryState);

    return (
        <div className="flex flex-row flex-nowrap text-xl gap-x-5 border-2 rounded-md p-2">
            <div>Week {week}</div>
            <div>Day: {day}</div>
            <div>{renderTime(timeMinutes.value, 'timer')}</div>
            <div>
                <Wallet className="inline" />{' '}
                <span>{Intl.NumberFormat().format(cash.value)}</span>
            </div>
            <div>
                Fixed exp.:{' '}
                <span>{Intl.NumberFormat().format(fixedExpenses)}</span>
            </div>
        </div>
    );
}
