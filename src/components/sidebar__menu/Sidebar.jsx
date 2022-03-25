import React, { useEffect } from 'react'
import FilterTransfer from '../filtersTransfer/FilterTranfer.jsx'
import FilterCompany from '../filtersCompany/FilterCompany.jsx'
import FromTo from '../fromto/FromTo.jsx'


const Sidebar = () => {

  return(
  <div className='menu'>
    <div className='menu__filters'>
      <FilterTransfer />
      <FilterCompany />
      <FromTo />
    </div>
  </div>
  )
}

export default Sidebar