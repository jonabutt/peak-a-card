import React, { useEffect, useState } from 'react'; 
import { Card } from './Components/Card';

const App: React.FC = () => {
  const [cardList, setCardList] = useState<number[]>([])
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  useEffect(() => {
      if(firstLoad){
        setFirstLoad(false);
        for(let i =0;i<16;i++){
          setCardList(cardList => [...cardList,i]);
        }
      }
      
  },[firstLoad])
  return (
    <div>
      <h1>Peak a Card 3  s d</h1>
      <section className="game-board">
       
        {
          cardList.map((c,index)=><Card key={index} value={c}/>)
        }
      </section>
    </div>
  );
}

export default App;
