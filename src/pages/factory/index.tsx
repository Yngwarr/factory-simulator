import { GridCanvas } from './components/grid-canvas';
import { Heading } from './components/heading';
import { ProductionChain } from './components/production-chain';
import { Resources } from './components/resources';

export function FactoryPage() {
	return (
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
		</div>
	);
}
