import React from 'react'
import DiceGoblin from '../assets/dice-goblin.jpeg'

const Home = () => {
  return (
    <div className="home">
      <img src={DiceGoblin} className="goblin-img" alt="Dice Goblin" />
      <div className="home-div">
        <span className="values">Welcome to Dice Goblin!</span><br />
        Avid dice collectors and statistics fanatics, you are home. Here you can catalog your dice and track their rolls to discover potential imbalances or hone your throwing technique. It doesn't matter what your endgame is or what game you're playing; Dice Goblin is the tool for you!<br />
        Click the <span>DICE</span> tab above to start adding your dice and get rolling!
      </div>
    </div>
  );
}

export default Home