import './App.css'
import Die from './components/Die'
import React from 'react'
import ReactConfetti from 'react-confetti'

function App() {
   const [dice,setDice]=React.useState(()=>generateAllNewDice())
   const gameWon=(dice.every(die=>die.isHeld))&&
    (dice.every(die=>die.value===dice[0].value))
   
   

  function generateAllNewDice(){
    let dice = []
    for(let i=0;i<10;i++){
      const num = Math.floor(Math.random() * 6) + 1;
      const item={
        value:num,
        isHeld:false,
        id: i+1
      }
      dice.push(item)
    }
    return dice
  }
  function rollDice(){
    if(!gameWon)(
    setDice(prev=>prev.map(die=>
      die.isHeld?
        die:
        {...die,value:Math.floor(Math.random() * 6) + 1}
    )))
    else{
      setDice(generateAllNewDice())
    }
  }

  function hold(id){
    setDice(prev=>{
      return prev.map(die=>{
        return die.id===id?
        {
          ...die,
          isHeld:!die.isHeld
          }:die 
      })
    })
  }

  const dieElements=dice.map(dice=>(
  <Die
   key={dice.id} 
   id={dice.id}
   value={dice.value} 
   isHeld={dice.isHeld} 
   hold={hold}>
   </Die>))
return(
  <main>
    {gameWon && <ReactConfetti/>}
    <h1 className='title'>Tenzies</h1>
    <div className='instructions'>
    <p >Roll until all dice are the same.Click each die to freeze it all its current value between rolls.</p>
    </div>
    <div className='grid-container'> 
    {dieElements}
    </div>
    <button onClick={rollDice} className='roll'>{gameWon?'New Game':'Roll'}</button>
  </main>
)
}
export default App
