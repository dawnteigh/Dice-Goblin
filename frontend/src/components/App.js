import '../App.css';
import NavBar from './NavBar';
import Home from './Home';
import Dice from './Dice';
import Stats from './Stats';
import { Route, Switch } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/dice" render={ (props) =>  <Dice { ...props } />} />
        <Route exact path="/stats" render={ (props) =>   <Stats { ...props } />} />
        <Route exact path="/" render={ (props) => <Home { ...props }/>} />
      </Switch>
    </div>
  );
}

export default App;
