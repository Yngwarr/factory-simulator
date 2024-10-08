import { render } from 'preact';
import { LocationProvider, Route, Router } from 'preact-iso';
import { NotFound } from './pages/_404.jsx';
import { FactoryPage } from './pages/factory/index.js';
import './style.css';
import { appState, createAppState } from './model.js';

export function App() {
    return (
        <appState.Provider value={createAppState()}>
            <LocationProvider>
                <main>
                    <Router>
                        <Route
                            path="/"
                            component={FactoryPage}
                        />
                        <Route
                            path="/factory-simulator/"
                            component={FactoryPage}
                        />
                        <Route
                            default
                            component={NotFound}
                        />
                    </Router>
                </main>
            </LocationProvider>
        </appState.Provider>
    );
}

render(<App />, document.getElementById('app'));
