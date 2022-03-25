import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Companies = (props) => {

  const { companies } = useSelector( state => state)
  const template = () => {
    let item = companies.filtered.filter((c) => c.id === props.company)
    const logo = `./img/${item[0].logo}`
    return (
    <img id={item[0].id} 
      className="header__logo-img" 
      src= {logo}
      alt="company-logo" 
    />
    )
  }
  
  return template()
}

export default Companies