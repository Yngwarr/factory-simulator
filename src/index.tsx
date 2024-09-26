import { render } from 'preact';
import { LocationProvider, Route, Router } from 'preact-iso';
import { NotFound } from './pages/_404.jsx';
import { FactoryPage } from './pages/factory/index.js';
import './style.css';
import { $$appModel } from './model.js';

export function App() {
	return (
		<LocationProvider>
			<main>
				<Router>
					<Route path="/" component={FactoryPage} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

addEventListener('resize', () => { $$appModel.windowResize });

render(<App />, document.getElementById('app'));
