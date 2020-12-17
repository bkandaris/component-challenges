import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Profile from './challengeOne_Profile/profile';




function App() {


	return (
		<div>
			<Route exact path="/profile" component={Profile} />
		</div>
	);
}

export default App;
