import React from 'react'
import Stack from 'react-bootstrap/Stack'

const Home = () => {
  return (
    <div className="home">
      <Stack gap={2} direction="horizontal">
        <img src="https://res.cloudinary.com/dvgfrkxl7/image/upload/v1656122755/pngwing.com_r2w6jr.png" alt="Dice Goblin" />
        <div className="homeDiv">
          Welcome to Dice Goblin! Do you like to roll dice? Are you fascinated
          by statistics, or obsessed with how balanced your dice are? If your
          response to any of the preceding questions was "yes" or even "eh, kind
          of... I guess", read on. Whether it be for games of chance, board
          games, or TTRPGs, Dice Goblin is here to track all of your dice rolls
          and help you answer questions like "Which of my d20s rolls the highest
          numbers on average?" or "Does this particular dice throwing technique
          really result in fewer sevens?". Find out if your dice are balanced or
          if they fly in the face of probability itself as you log countless
          rolls and watch the averages change in real time.
        </div>
      </Stack>
    </div>
  );
}

export default Home