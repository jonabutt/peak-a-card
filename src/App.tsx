import React, { useEffect, useState } from 'react'; 
import { Card } from './Components/Card';

const App: React.FC = () => {
  const [cardList, setCardList] = useState<{value: number,isShowingFront: boolean,index: number}[]>([])
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  useEffect(() => {
      if(firstLoad){
        setFirstLoad(false);
        for(let i =0;i<16;i++){
          setCardList(cardList => [...cardList,{value:i, isShowingFront: false, index:i}]);
        }
      }
      
  },[firstLoad])
  const handleClickCard = (index: number) => {
    let tempCardList = [...cardList];
    tempCardList[index].isShowingFront = true;
    setCardList(tempCardList);
  }
  return (
    <div>
      <h1>Peak a Card 3  s d</h1>
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
    </div>
  );
}

export default App;
