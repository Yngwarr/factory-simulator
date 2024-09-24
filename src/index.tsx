import { render } from 'preact';
import { LocationProvider, Route, Router } from 'preact-iso';
import { FactoryPage } from './pages/Factory/index.js';
import { NotFound } from './pages/_404.jsx';
import './style.css';

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

render(<App />, document.getElementById('app'));
