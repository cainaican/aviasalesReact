import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addShownTickets } from '../../slices/ticketSlice'



const Button = () =>{

  const { tickets } = useSelector(state => state)
  const dispatch = useDispatch()

  return(
    <button id='show-more' 
    className='button'
    onClick={e => dispatch(addShownTickets(tickets.shownTickets + 5))}
    >
      Показать еще 5 билетов!
    </button>
  )
}

export default Button