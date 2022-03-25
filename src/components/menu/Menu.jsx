import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reload as reloadTicket } from '../../slices/ticketSlice'
import { reload as reloadSegment } from '../../slices/segmentSlice'
import { reloadSort } from '../../slices/sortSlices'




const Menu = () =>{

  const { sorting, tickets, segments } = useSelector( state => state )
  const dispatch = useDispatch()

  const makeSort = (e) => {
    dispatch(reloadSort(e.target.id))
  }
  
  return(
    <ul className='menu'>
      <li id='chipest' 
      className={ (sorting === 'chipest') 
      ?  'menu__item active'
      : 'menu__item'}
      onClick={e => makeSort(e)}
    >
      Самый дешевый
    </li>
    <li id='fastest' 
      className={ (sorting === 'fastest') 
      ?  'menu__item active'
      : 'menu__item'}
      onClick={e => makeSort(e)}
    >
      Самый быстрый
    </li>
    <li id='optimal' 
      className={ (sorting === 'optimal') 
      ?  'menu__item active'
      : 'menu__item'}
      onClick={e => makeSort(e)}
    >
      Оптимальный
    </li>
    </ul>
  )
}

export default Menu