import { renderTime } from '@/utils';
import { $$factoryModel } from '@factory/model';
import { useUnit } from 'effector-react';
import { Wallet } from 'lucide-preact';

export function InfoWidget() {
    const {
        $week: week,
        $day: day,
        $timeMinutes: timeMinutes,
        $cash: cash,
        $fixedExpenses: fixedExpenses,
    } = useUnit($$factoryModel);

    return (
        <div className="flex flex-row flex-nowrap text-xl gap-x-5 border-2 rounded-md p-2">
            <div>
                Week {week}, {renderTime(timeMinutes, 'timer')}
            </div>
            <div>Day: {day}</div>
            <div>
                <Wallet className="inline" />{' '}
                <span>{Intl.NumberFormat().format(cash)}</span>
            </div>
            <div>
                Fixed exp.:{' '}
                <span>{Intl.NumberFormat().format(fixedExpenses)}</span>
            </div>
        </div>
    );
}
