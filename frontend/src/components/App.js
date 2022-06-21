import '../App.css';
import NavBar from './NavBar';
import Home from './Home';
import Dice from './Dice';
import Stats from './Stats';
import { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";


function App() {

  const [dice, setDice] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/dice")
    .then(r => r.json())
    .then(data => setDice(data))
  }, [])


  return (
    <div className="App">
      <NavBar />
      <Switch>
      <Route exact path="/dice" render={ (props) =>  <Dice { ...props } dice={dice} />} />
      <Route exact path="/stats" render={ (props) =>   <Stats { ...props } dice={dice} />} />
      <Route exact path="/" render={ (props) => <Home { ...props }/>} />
      </Switch>
    </div>
  );
}

export default App;
