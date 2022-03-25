import React, { useEffect, useState } from 'react'
import Companies from './Companies'
import Segments from './Segments'
import { useSelector, useDispatch } from 'react-redux'
import { reload as reloadTicket } from '../slices/ticketSlice'
import { reload as reloadSegment } from '../slices/segmentSlice'
import { reload as reloadCompany } from '../slices/companySlice'
import { reloadSort } from '../slices/sortSlices'
import { store } from '../store/store.js'

const mainFilter = () => {
  const { tickets, segments, companies, sorting } = useSelector(state => state)

  const dispatch = useDispatch()
    
  let newFiltTick = [...tickets.base]
  let newFiltSeg = [...segments.base]
  
  const makeFromTo = () => {

    if ( tickets.origin !== "" && tickets.destination !== ""){

      newFiltSeg = segments.base.filter(a => { 
        return a.origin === tickets.origin && a.destination === tickets.destination
      })

      for ( let ticket of tickets.base) {
        let newFiltTicket = { ...ticket, segments: ticket.segments.filter( id => {
          let obj = newFiltSeg.find(seg => seg.id === id)
          return obj?.id === id
        })}
        newFiltTick.push(newFiltTicket)
      }

      newFiltTick = newFiltTick.filter( ticket => {
        return ticket.segments.length > 0
      })
    }

  }

  const filterCompany = () => {
    if (companies.sortCompany !== 'all' && companies.sortCompany !== ''){
      newFiltTick = newFiltTick.filter(ticket => companies.sortCompany === ticket.companyId)
    } 
  }

  const filterTransfer = () => {

    newFiltSeg = newFiltSeg.filter(a => {
      let notChoosen = 0
      
      for ( let item of tickets.transferFilter){
        if(item === null){
          notChoosen++
        }
      }
      
      return (notChoosen !== 4 ) ? tickets.transferFilter.includes(String(a.stops.length)) : true
    })
    const newFiltTickCopy = []
    
    for ( let ticket of newFiltTick) {
      let newFiltTicket = { ...ticket, segments: ticket.segments.filter( id => {
        let obj = newFiltSeg.find(seg => seg.id === id)
        return obj?.id === id
      })}
      newFiltTickCopy.push(newFiltTicket)
    }

    newFiltTick = new Array()
    newFiltTick = [...newFiltTickCopy]

    newFiltTick = newFiltTick.filter( ticket => {
      return ticket.segments.length > 0
    })
  }

  const makeSorting = () => {
  
    const showChipest = () => {
      newFiltTick = newFiltTick.sort((a, b) => a.price - b.price)
    }
  
    const showFastest = () => {
      newFiltSeg = newFiltSeg.sort( (a, b) => a.duration - b.duration)
      newFiltTick = newFiltTick.sort( (a, b) => {
        return newFiltSeg.findIndex(el => el.id === a.segments[0]) - newFiltSeg.findIndex(el => el.id === b.segments[0])
      })
    }
  
    const showOptimal = () => {    
      newFiltTick = newFiltTick.sort((a, b) => a.price - b.price)
    }
    
    switch (sorting){
      case 'chipest': showChipest(); 
        break;
      case 'fastest': showFastest(); 
        break;
      case 'optimal': showOptimal(); 
        break;
    }

  }

  makeFromTo()
  filterCompany()
  filterTransfer()
  makeSorting()

  dispatch(reloadSegment(newFiltSeg))
  dispatch(reloadTicket(newFiltTick))
}

export default mainFilter