import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reload as reloadSegment } from '../../slices/segmentSlice'
import { reload as reloadTicket } from '../../slices/ticketSlice'
import { setTransferFilter } from '../../slices/ticketSlice'


const FilterTranfer = () => {

  const { segments, tickets } = useSelector( state => state )
  const dispatch = useDispatch()

  const reloadFilter = (e) => {

    let transferFilterCopy = [...tickets.transferFilter]

    transferFilterCopy[e.target.name] = e.target.checked ? e.target.name : null
    
    dispatch(setTransferFilter(transferFilterCopy))

  }

  return(
  <div className='menu__filters-transfer'>
    <ul className='menu__filters-transfer-list'>
      <li className='menu__filters-transfer-item'>
        <span>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      </li>
      <li className='menu__filters-transfer-item'>
        <div id='inpute_transfer'>
          <input type='checkbox' 
            name = '0' 
            id='checkbox'
            className='input__transfer'
            onChange={(e) => reloadFilter(e)}
          />
          <label  form='transfer'>Без пересадок</label>
        </div>
      </li>
      <li className='menu__filters-transfer-item'>
        <div id='inpute_transfer'>
          <input type='checkbox' 
            name = '1' 
            id='checkbox' 
            className='input__transfer'
            onChange={(e) => reloadFilter(e)}
          />
          <label  form='transfer'>1 пересадка</label>
        </div>
      </li>
      <li className='menu__filters-transfer-item'>
        <div id='inpute_transfer'>
          <input type='checkbox'
            name = '2'
            id='checkbox'
            className='input__transfer'
            onChange={(e) => reloadFilter(e)}
          />
          <label  form='transfer'>2 пересадки</label>
        </div>
      </li>
      <li className='menu__filters-transfer-item'>
        <div id='inpute_transfer'>
          <input type='checkbox'
              name = '3'
              id='checkbox'
              className='input__transfer'
              onChange={(e) => reloadFilter(e)}
            />
          <label  form='transfer'>3 пересадки</label>
        </div>
      </li>
    </ul>
  </div>
  )
}

export default FilterTranfer