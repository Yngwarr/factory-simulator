import { appState, updateGridRect } from '@/model';
import { useContext, useEffect } from 'preact/hooks';
import { GridCanvas } from './components/grid-canvas';
import { Heading } from './components/heading';
import { ProductionChain } from './components/production-chain';
import { Resources } from './components/resources';
import { defaultFactory } from './defaults';
import { createFactoryState, factoryState } from './model';
import { Modals } from './components/modals';

export function FactoryPage() {
    const ctx = useContext(appState);

    useEffect(() => {
        const onUpdate = () => {
            updateGridRect(ctx);
        };

        addEventListener('resize', onUpdate);

        return () => {
            removeEventListener('resize', onUpdate);
        };
    }, [ctx]);

    return (
        <factoryState.Provider value={createFactoryState(defaultFactory)}>
            <div
                id="factory"
                className={[
                    'w-full',
                    'h-full',
                    'px-6',
                    'pb-6',
                    'grid',
                    'grid-cols-factory',
                    'grid-rows-factory',
                ].join(' ')}
            >
                <Heading className="col-span-2" />
                <Resources />
                <ProductionChain />
                <GridCanvas />
                <Modals />
            </div>
        </factoryState.Provider>
    );
}
