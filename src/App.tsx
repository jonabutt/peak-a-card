import React, { useEffect, useState } from 'react'; 
import _ from 'lodash';
import { Card } from './Components/Card';
import { launchConfetti } from './utilities/confetti';

interface CardObject {
  value: string;
  isShowingFront: boolean;
  index: number;
  matched: boolean;
}

interface UserSelection {
  index: number;
  faceValue: string;
}

const App: React.FC = () => {
  const [cardList, setCardList] = useState<CardObject[]>([])
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  const [userSelection, setUserSelection] = useState<UserSelection[]>([])
 // const [status, setStatus] = useState<string>("")
  useEffect(() => {
      if(firstLoad){
        setFirstLoad(false);

        // card items
        const cardItems: string[] = ["snowman", "deer", "bauble", "present", "star", "tree", "wreath", "festoon"];
        let tempCardList: CardObject[] = [];
        // loop all card items
        cardItems.forEach((cardItem,index) => {
          // add two cards with the same value
          const cardOne: CardObject = {value: cardItem,isShowingFront: false, index: index+index,matched: false};
          const cardTwo: CardObject = {value: cardItem,isShowingFront: false, index: index+index+1,matched: false};
          tempCardList = [
            ...tempCardList,
            cardOne,
            cardTwo
          ];
        });
        // reset the game so the card list will be shuffled
        restartGame(tempCardList);
      }
      
  },[firstLoad])

  const status = () => {
    // return the status depending on the winning codition
    const remainingPairs: number = getRemainingPairs();
    if(remainingPairs === 0){
      if(!firstLoad){
        launchConfetti();
      }
      return 'Player wins!';
    }
    else{
      return `Remaining Pairs: ${remainingPairs}`;
    }
  }

  const restartGame = (cardListParam?: CardObject[]) => {
   
    let tempCardList = cardListParam || [...cardList];
 
    tempCardList = _.shuffle(tempCardList).map((card,index)=>{
      return {
        ...card,
        matched: false,
        isShowingFront: false,
        index: index
      }
    })
    setCardList(tempCardList);

    
  }

  const getRemainingPairs = () => {
    // calculating the remaining pairs that needs to be matched
    const remainingCards = cardList.filter(c=>c.matched===false).length;
    return remainingCards / 2;
  }

  const handleClickCard = (index: number,faceValue: string) => {
    if(userSelection.length<2)
    {
      // setting visible of the face the card
      let tempCardList = [...cardList];
      const selectedCard = tempCardList[index];
      // check if card is already matched or card already selected
      if(selectedCard.matched || selectedCard.isShowingFront){
        return;
      }

      selectedCard.isShowingFront = true;
      setCardList(tempCardList);
      // setting selected card of the user
      let tempUserSelection = [...userSelection];
      tempUserSelection.push({index: index,faceValue: faceValue});
      setUserSelection(tempUserSelection);
      // flip the cards back over when there are two card visible
      if(tempUserSelection.length === 2){
        const cardOne = tempUserSelection[0];
        const cardTwo = tempUserSelection[1];
        
        // check if card one matches with card two
        if(cardOne.faceValue === cardTwo.faceValue){
          // setting boolean of the card as matched
          let matchTempCardList = [...cardList];
          matchTempCardList[cardOne.index].matched = true;
          matchTempCardList[cardTwo.index].matched = true;
          setCardList(matchTempCardList);
        }
        else{
          // wait 1 second to flip card back over
          setTimeout(()=>{
            // flipping the cards on the back
            let resetTempCardList = [...cardList];
            resetTempCardList[cardOne.index].isShowingFront = false;       
            resetTempCardList[cardTwo.index].isShowingFront = false;
            setCardList(resetTempCardList);
          },1000)
        
        }
        // reset the cards user selection
        setUserSelection([]);
      }
    }    
  }
  return (
    <div id="app">
      <h1>Peek-a-Card</h1>
      <section className="description">
        <p>Welcome to Peek-a-Card!</p>
        <p>A card matching game made by React.js!</p>
      </section>
      <section className="game-board">
        {
          cardList.map(c=>
              <Card
                key={c.index} 
                value={c.value}
                index={c.index}
                matched={c.matched}
                isShowingFront={c.isShowingFront}
                handleClickCard={handleClickCard}
              />
          )
        }
      </section>
      <h2>{status()}</h2>
      <button onClick={()=>restartGame()} className='button'>
        <img src='/images/restart.svg' alt='restart-icon'/>
        Restart
      </button>
    </div>
  );
}

export default App;
