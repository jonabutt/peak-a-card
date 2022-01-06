import React, { useEffect, useState } from 'react'; 
import { Card } from './Components/Card';

const App: React.FC = () => {
  const [cardList, setCardList] = useState<{value: number,isShowingFront: boolean,index: number,matched: boolean}[]>([])
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  const [userSelection, setUserSelection] = useState<{index: number,faceValue: number}[]>([])
 // const [status, setStatus] = useState<string>("")
  useEffect(() => {
      if(firstLoad){
        setFirstLoad(false);
        for(let i =0;i<16;i++){
          setCardList(cardList => [...cardList,{value:10, isShowingFront: false, index:i,matched: false}]);
        }
      }
      
  },[firstLoad])
  const status = () => {
    // return the status depending on the winning codition
    const remainingPairs = getRemainingPairs();
    if(remainingPairs === 0){
      return 'Player wins!';
    }
    else{
      return `Remaining Pairs: ${remainingPairs}`;
    }
  }
  const getRemainingPairs = () => {
    // calculating the remaining pairs that needs to be matched
    const remainingCards = cardList.filter(c=>c.matched===false).length;
    return remainingCards / 2;
  }
  const handleClickCard = (index: number,faceValue: number) => {
    // console.log(remainingPairs())
    // console.log("remainingPairs")
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
          // flipping the cards on the back
          let resetTempCardList = [...cardList];
          resetTempCardList[cardOne.index].isShowingFront = false;       
          resetTempCardList[cardTwo.index].isShowingFront = false;
          setCardList(resetTempCardList);
        }
        // reset the cards user selection
        setUserSelection([]);
      }
    }    
  }
  return (
    <div>
      <h1>Peak a Card 3</h1>
      <section className="game-board">
       
        {
          cardList.map(c=>
              <Card
                key={c.index} 
                value={c.value}
                index={c.index}
                isShowingFront={c.isShowingFront}
                handleClickCard={handleClickCard}
              />
          )
        }
      </section>
      <h2>{status()}</h2>
    </div>
  );
}

export default App;
