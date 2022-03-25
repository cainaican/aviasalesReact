import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filter } from '../../slices/companySlice'
import { reload as reloadTicket } from '../../slices/ticketSlice'
import Company from '../company/Company'

const FilterCompany = (props) => {

  const { companies, tickets } = useSelector( state => state )
  const dispatch = useDispatch()

  const companyContainer = companies.base.map(company => {
    return <Company key={company.id} company={company} />
  })

  // useEffect(() => {
  //   makeCompanyFilter()
  // }, [companies])

  return(
    <div className='menu__filters-company'>
      <div className='menu__filters-company-list'>
        <div className='menu__filters-company-item'>
          <span>Компания</span>
        </div>
        <div className='menu__filters-company-item'>
          <input id='all' 
            className='radio' 
            type='radio' 
            name='company'
            onClick={(e) => dispatch(filter(e.target.id))}
          />
          <label form='all'> Все </label>
        </div>
        {companyContainer}
      </div>
    </div>
  )
}

export default FilterCompany