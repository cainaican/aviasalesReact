import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { filter } from "../../slices/companySlice"

const Company = (props) => {

  const dispatch = useDispatch()

  return(
    <div className='menu__filters-company-item'>
      <input id={props.company.id}
        className='radio' 
        type='radio' 
        name='company' 
        onClick={(e) => dispatch(filter(e.target.id))}
      />
      <label form={props.company.id} > {props.company.name} </label>
    </div>
  )
}

export default Company