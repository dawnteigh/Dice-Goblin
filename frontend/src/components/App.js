import '../App.css';
import NavBar from './NavBar';
import Home from './Home';
import Dice from './Dice';
import Stats from './Stats';
// import {AdvancedImage} from '@cloudinary/react';
// import {Cloudinary} from "@cloudinary/url-gen";
import { useContext, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import { DiceContext } from "../context/dice";




function App() {

  const { setDice } = useContext(DiceContext)

  useEffect(() => {
    fetch("http://localhost:9292/dice")
    .then(r => r.json())
    .then(data => setDice(data))
  }, [])


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
