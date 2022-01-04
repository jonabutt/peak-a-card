import React from 'react';
import styled from 'styled-components';

interface Props {
    index: number,
    value: number,
    isShowingFront: boolean,
    handleClickCard: (value: number) => void

}

const CardStyle = styled.div`
    
    .card-face{
        width: 100%;
        height: 100%;
        border-radius: 4px;
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.57);
        cursor: pointer;
      
        &.card-front{
            background: red;
        }
        &.card-back{
            background: rgb(83, 19, 213);
            background: linear-gradient(
              321deg,
              rgba(83, 19, 213, 1) 25%,
              rgba(108, 22, 157, 1) 75%
            );
            
        }
    }
`

export const Card: React.FC<Props> = ({index,value,isShowingFront,handleClickCard}) => {
    return (
        <CardStyle onClick={()=>handleClickCard(index)}>
            {isShowingFront &&
                <div className="card-face card-front">
                    {value}
                </div>
            }
            {!isShowingFront &&
                <div className="card-face card-back">

                </div>
            }
        </CardStyle>
    );
}