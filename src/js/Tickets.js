import Companies from './Companies'
import Segments from './Segments'

class Tickets {

  _Tickets = []
  _Companies = []
  _Segments = []
  _filteredTickets = []
  _filteredCompanies = []
  _filteredSegments = []
  _sorting = 'chipest'
  _ticketsTemplate
  _origin
  _destination
  _countOfDisplayedItem = 5

  constructor(){
    this._Companies = new Companies
    this._Segments = new Segments
  }

  listeners(){
    const fromto = document.querySelector('#button')
    fromto.onclick = (e) => this.showFromTo(e)

    const transferFilter = document.querySelector('.menu__filters-transfer-list')
    transferFilter.onclick = () => this.reloadFilteredTickets()

    const companyFilter = document.querySelector('.menu__filters-company-list')
    companyFilter.onclick = () => this.reloadFilteredTickets()
    
    const showMore = document.querySelector('#show-more')
    showMore.onclick = () => this.showMoreTickets()

    const chipest = document.querySelector('#chipest')
    chipest.onclick = (e) => this.makeSort(e.target.id)

    const fastest = document.querySelector('#fastest')
    fastest.onclick = (e) => this.makeSort(e.target.id)

    const optimal = document.querySelector('#optimal')
    optimal.onclick = (e) => this.makeSort(e.target.id)
  }

  showMoreTickets(){
    this.reloadFilteredTickets(true)
  }

  reloadFilteredTickets(add){

    add === true ? this._countOfDisplayedItem += 5 : this._countOfDisplayedItem = 5;

    this._filteredSegments =  [...this._Segments._segments]
    this._filteredCompanies =  [...this._Companies._companies]
    this._filteredTickets = JSON.stringify(this._Tickets)
    this._filteredTickets = JSON.parse(this._filteredTickets)
    

    this.makeFromTo()
    this.makeTransferFilter()
    this.makeCompanyFilter()

    this.makeSort(this._sorting)

  }

  makeSort(sorting){
    
    this._sorting = sorting

    document.querySelector(`#fastest`).classList.remove('active')
    document.querySelector(`#chipest`).classList.remove('active')
    document.querySelector(`#optimal`).classList.remove('active')
    document.querySelector(`#${sorting}`).classList.toggle('active')

    switch (sorting){
      case 'chipest': this.showChipest(); 
        break;
      case 'fastest': this.showFastest(); 
        break;
      case 'optimal': this.showOptimal(); 
        break;
    }

    this.createTemplate()
  }

  makeCompanyFilter(){

    const radioList = document.querySelectorAll('.radio')

    let arr = ''
    for(let i = 0; i < 3; i++){
      if(radioList[i].checked){
       arr = radioList[i].id
      }
    }
    console.log(arr)
     this._filteredCompanies = (arr === 'radio_1' || arr === '')
       ? this._filteredCompanies = [...this._Companies._companies]
       : this._filteredCompanies.filter(comp => comp.id === arr)

    this._filteredTickets = this._filteredTickets.filter(ticket => {
      let obj = this._filteredCompanies.filter( company => company.id === ticket.companyId)
      return obj[0]?.id === ticket.companyId
    })

  }

  makeTransferFilter(){
    const checkboxList = document.querySelectorAll('#checkbox')
    let arr = []
    for(let i = 0; i < 4; i++){
      arr.push(+checkboxList[i].checked)
    }
    
    this._filteredSegments = (arr.join('') === '0000')
      ? this._filteredSegments = [...this._Segments._segments]
      : this._Segments._segments.filter(a => arr[a.stops.length])

    this._filteredTickets = this._filteredTickets.filter(a => {
      a.segments = a.segments.filter( id => {
        let obj = this._filteredSegments.find( seg => seg.id === id)
        return obj?.id === id
      })
      return a.segments.length > 0
    })
  }

  showFromTo(e){
    e.preventDefault()
    this._origin = document.querySelector('#from').value.toUpperCase()
    this._destination = document.querySelector('#to').value.toUpperCase()
    console.log(this._origin)
    console.log(this._destination)
    if (document.querySelector('#from').value=== '' || document.querySelector('#to') === ''){
      document.querySelector('#from').style.borderColor = 'red'
      document.querySelector('#to').style.borderColor = 'red'
    } else {
      document.querySelector('#from').style.borderColor = '#2196f3'
      document.querySelector('#to').style.borderColor = '#2196f3'
      this.reloadFilteredTickets()
      console.log('bb')
      return true
    }
  }

  makeFromTo(){

    if (this._origin !== undefined && this._destination !== undefined){
      this._filteredSegments = this._Segments._segments.filter(a => a.origin === this._origin && a.destination === this._destination)

      this._filteredTickets = this._filteredTickets.filter(a => {
        a.segments = a.segments.filter( id => {
          let obj = this._filteredSegments.find( seg => seg.id === id)
          return obj?.id === id
        })
        return a.segments.length > 0
      })
    }
    console.log('aa')    
  }


  showChipest(){
    this._filteredTickets.sort((a, b) => a.price - b.price)
  }

  showFastest(){
    this._filteredSegments.sort( (a, b) => a.duration - b.duration)
    this._filteredTickets.sort( (a, b) => {
      return this._filteredSegments.findIndex(el => el.id === a.segments[0]) - this._filteredSegments.findIndex(el => el.id === b.segments[0])
    })
  }

  showOptimal(){
    this._filteredTickets.sort((a, b) => a.price - b.price)
  }

  fetchListsFromJSON() {
    this._Companies.fetchList()
    this._Segments.fetchList()
    this.fetchList()
    this.listeners()
  }

  fetchList(){
    const listOfTickets = fetch(`./json/tickets.json`)
    return listOfTickets
      .then(res => res.json())
      .then(data => {
        this._Tickets = [...data]
        this._filteredSegments = [...this._Segments._segments]
        this._filteredTickets = JSON.stringify(this._Tickets)
        this._filteredTickets = JSON.parse(this._filteredTickets)
        this.createTemplate()
      })
      .catch(e => console.warn(e.message))
  }
  
  async createTemplate(){

    this._filteredTickets = [ ...this._filteredTickets.slice(0, this._countOfDisplayedItem) ]

    document.querySelector('.tickets').innerHTML = ''

    this._ticketsTemplate = await this._filteredTickets.map( item => {
      let ticketDiv =document.createElement('div')
      ticketDiv.innerHTML +=`
      <div class="main__ticket" id="${ item.id }">
        <div class="header">
          <div class="header__price">${ item.price } Р</div>
          <div class="header__logo">${ this._Companies.createTemplate(item.companyId)}</div>
        </div>
        <div class="flight">
          ${ this._Segments.createTemplate(item.segments) }
        </div>
      </div>
    `
      return ticketDiv
    })

    return( this._ticketsTemplate.map( temp => {
        document.querySelector('.tickets').appendChild(temp) 
      })
    )
  }
}

export default Tickets