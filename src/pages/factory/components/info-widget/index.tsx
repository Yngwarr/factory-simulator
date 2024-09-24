import { Wallet } from 'lucide-preact';

export function InfoWidget() {
    return (
        <div className="flex flex-row flex-nowrap">
            <div className="mr-4">
                Week <span>1</span>, <span>0</span>:<span>00</span>
            </div>
            <div className="mr-4">
                <Wallet className="inline" /> <span>12.000</span>
            </div>
            <div className="mr-4">
                Fixed exp.: <span>11.000</span>
            </div>
        </div>
    );
}
