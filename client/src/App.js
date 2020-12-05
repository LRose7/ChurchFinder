import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';
import Home from './screens/Home';
import Addchurch from './screens/Addchurch';
import Signup from './screens/Signup';
import Login from './screens/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Findchurch from './screens/Findchurch';

function App() {

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Addchurch" component={Addchurch} />
          <Route path="/Signup" component={Signup} />
          <Route path="/Login" component={Login} />
          <Route path="/FindChurch" component={Findchurch} />
        </Switch>
        <div>

        </div>
      </div>
    </Router>




  )
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
