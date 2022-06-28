import React from 'react'
import Stack from 'react-bootstrap/Stack'

const Home = () => {
  return (
    <div className="home">
      <Stack gap={2} direction="horizontal">
        <img src="https://res.cloudinary.com/dvgfrkxl7/image/upload/v1656122755/pngwing.com_r2w6jr.png" alt="Dice Goblin" />
        <div className="homeDiv">
          <span className="values">Welcome to Dice Goblin!</span><br/>
          Avid dice collectors and statistics fanatics, you are home. Here you can catalog your dice and track their rolls to discover potential imbalances or hone your throwing technique. It doesn't matter what your endgame is or what game you're playing; Dice Goblin is the tool for you!<br/>
          Click the <span
            style={{ 
              fontFamily: "monospace, 'Courier New', Courier",
              fontSize: "16px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#65e6f7"
            }}> Dice</span> tab above to start adding your dice and get rolling!
        </div>
      </Stack>
    </div>
  );
}

export default Home