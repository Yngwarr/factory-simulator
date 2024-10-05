import { renderTime } from '@/utils';
import { factoryState } from '@factory/model';
import classNames from 'classnames';
import { Wallet } from 'lucide-preact';
import { useContext } from 'preact/hooks';

function MoneyLabel({ amount }) {
    return (
        <div
            className={classNames([
                'absolute',
                'text-sm',
                'font-bold',
                'text-red-600',
                'border',
                'border-white',
                'rounded',
                'px-1',
                'ik-bg-color',
                '-translate-x-3',
                'float-up',
                amount > 0 ? 'text-green-600' : 'text-red-600',
            ])}
        >
            {amount > 0 && '+'}
            {amount}
        </div>
    );
}

export function InfoWidget() {
    const { week, day, timeMinutes, cash, fixedExpenses, moneyLabel } =
        useContext(factoryState);

    return (
        <div className="flex flex-row flex-nowrap text-xl gap-x-5 border-2 rounded-md p-2">
            <div>Week {week}</div>
            <div>Day: {day}</div>
            <div>{renderTime(timeMinutes.value, 'timer')}</div>
            <div>
                {moneyLabel.value.map(({ id, amount }) => {
                    return (
                        <MoneyLabel
                            key={id}
                            amount={amount}
                        />
                    );
                })}
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
