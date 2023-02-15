import React, { useState } from 'react';
import { useParams} from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { CardType } from '../Cards/CardsAPI/CardsAPI';


export const LearnPage=()=>{
  const {packId, packName} = useParams<'packId' | 'packName'>();

  const [card, setCard] = useState<CardType>({
    _id: '',
    cardsPack_id: '',
    answer: '',
    question: '',
    grade: 0,
    shots: 0,
    type: '',
    rating: 0,
    more_id: '',
    created: '',
    updated: '',
});
  return(
    <div>
<div>Learn{packName}</div>
<div><span >Question: </span>{card.question}</div>


    </div>
  )
}