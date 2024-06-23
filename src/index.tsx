import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import { Manage } from './pages/Manage/manage.jsx'
import './style.css';
import {Foooter} from './components/Footer.js';
import {About} from './pages/About/about.js';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/about" component={About} />
					<Route path="/*" component={Manage} />
					<Route default component={NotFound} />
				</Router>
			</main>	
			<Foooter/>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
