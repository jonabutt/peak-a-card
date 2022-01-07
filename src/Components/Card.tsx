import React from 'react';
import styled from 'styled-components';

interface Props {
    index: number,
    value: string,
    isShowingFront: boolean,
    handleClickCard: (index: number,faceValue: string) => void,
    matched: boolean
}

const CardStyle = styled.div`
  
    transition: 1s transform ease-in;
    transform-style: preserve-3d;
    &.is-flipped{
        transform: rotateY(180deg);
    }
    .card-face{
        width: 100%;
        height: 100%;
        border-radius: 8px;
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.57);
        cursor: pointer;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        backface-visibility: hidden;
        position: absolute;
        &.card-front{
            background: rgb(22,157,123);
            background: linear-gradient(321deg, rgba(22,157,123,1) 25%, rgba(54,185,226,1) 75%);     
            
            transform: rotateY(180deg);
        }
        &.card-back{
            background: rgb(83, 19, 213);
            background: linear-gradient(
              321deg,
              rgba(83, 19, 213, 1) 25%,
              rgba(108, 22, 157, 1) 75%
            );
        }
        .icon-checkmark{
            position: absolute;
            right: 5px;
            bottom: 5px;
        }
    }
`

export const Card: React.FC<Props> = ({index,value,isShowingFront,matched,handleClickCard}) => {
    return (
        <CardStyle onClick={()=>handleClickCard(index,value)} className={isShowingFront?"is-flipped":""}>
            <div className={"card-face card-front"}>
                <img src={`/images/${value}.png`} alt="checkmark" />
                {matched && <img src="/images/checkmark.svg" alt="checkmark" className='icon-checkmark'/>}
            </div>
            <div className='card-face card-back'>

            </div>
        </CardStyle>
    );
}