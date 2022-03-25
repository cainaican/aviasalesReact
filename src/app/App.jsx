import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import Sidebar from '../components/sidebar__menu/Sidebar.jsx'
import Menu from '../components/menu/Menu.jsx'
import Button from '../components/button/Button.jsx'
import Tickets from '../js/Tickets.js'
import { useDispatch } from 'react-redux'
import { add as addCompany } from '../slices/companySlice.js'
import { add as addSegment } from '../slices/segmentSlice.js'
import { add as addTicket } from '../slices/ticketSlice.js'

const App = () =>{

  const dispatch = useDispatch()

  const fetchTickets = () => {
    fetch('./json/tickets.json')
      .then( resp => resp.json())
      .then( data => {
        const json = JSON.stringify(data)
        dispatch(addTicket(JSON.parse(json)))
      }
    )
  }
  const fetchSegments = () => {
    fetch('./json/segments.json')
    .then( resp => resp.json())
    .then( data => {
      const json = JSON.stringify(data)
      dispatch(addSegment(JSON.parse(json)))
    })
  }
  const fetchCompanies = () => {
    fetch('./json/companies.json')
    .then( resp => resp.json())
    .then( data => {
      const json = JSON.stringify(data)
      dispatch(addCompany(JSON.parse(json)))
    })
  }
  useEffect(() => {
    fetchCompanies()
    fetchSegments()
    fetchTickets()
  }, []);

  return(
    <div className='container'>
      <header className='header'>
        <img alt='logo' className='logo' src='./img/logo.svg'/>
      </header>
      <section className='section'>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <main className='main'>
          <Menu />
          <div className='tickets'><Tickets /></div>
          <Button />
        </main>
        <div class="refs">
          <a href="https://cainaican.github.io/portfolio/" class="refs__back" title="back">
            <img src="./img/backPr.png" alt="portfolio" class="refs__back-img" />
          </a>
          <a href="https://github.com/cainaican/aviasalesReact" class="refs__back" title="repo in github">
              <img src="./img/ghPr.png" alt="gitHub" class="refs__back-img" />
          </a>
        </div>
      </section>
    </div>
  )
}

export default App