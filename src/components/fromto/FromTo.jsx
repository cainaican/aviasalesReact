import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reload as reloadSegment} from '../../slices/segmentSlice'
import { reload as reloadTicket } from '../../slices/ticketSlice'
import { setFromTo } from '../../slices/ticketSlice'




const FromTo = () =>{

  const [destination, setDestination] = useState('1')
  const [origin, setOrigin] = useState('1')
  
  const { tickets, segments } = useSelector(state => state)
  const dispatch = useDispatch()


  const findTickets = (e) => {
    e.preventDefault()
    dispatch(setFromTo({destination: destination, origin: origin}))
  }

  return(
    <div className='menu__filters-fromto '>
      <form>
        <div className='from'>
          <label form='from'>Откуда</label>
          <input id='from' 
            type='text' 
            name='from'
            onChange={ e => setOrigin(e.target.value)}
            className= { (origin === '') ? 'input secure' : 'input' }
          />
        </div>
        <div className='to'>
          <label form='to'>Куда</label>
          <input id='to' 
            type='text' 
            name='to' 
            onChange={ e => setDestination(e.target.value)}
            className= { (destination === '') ? 'input secure' : 'input' }
          />
        </div>
        <div className='button'>
          <button id='button'
          type='submit'
          onClick={(e) => findTickets(e)}
          >
            Найти
          </button>
        </div>
      </form>
    </div>
  )
}

export default FromTo