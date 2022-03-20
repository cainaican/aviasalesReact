class Segments {
  _segments
  constructor(){}

  fetchList(){
    const listOfSegments = fetch(`./json/segments.json`)
    return listOfSegments
      .then(res => res.json())
      .then(data => {
        this._segments = [...data]
      })
      .catch(e => console.warn(e.message))
  }

  createTemplate(arr){

    let template = arr.map((id) => {
        
      //id ---> {o, d, dS, dE, dur, s}
      let segmentDiv = document.createElement('div')
      let item = this._segments.find(c => c.id === id)
      let dateStart =  `${new Date(item.dateStart).getHours() > 9 ? new Date(item.dateStart).getHours() : '0' + new Date(item.dateStart).getHours()} 
                      : ${new Date(item.dateStart).getMinutes() < 10 ? new Date(item.dateStart).getMinutes() + '0' : new Date(item.dateStart).getMinutes()}`
      let dateEnd = `${new Date(item.dateEnd).getHours() > 9 ? new Date(item.dateEnd).getHours() : '0' + new Date(item.dateEnd).getHours() } 
                      : ${new Date(item.dateEnd).getMinutes() < 10  ? new Date(item.dateEnd).getMinutes() + '0' : new Date(item.dateEnd).getMinutes()}`
      let duration = `${new Date(item.duration).getHours() > 9 ? new Date(item.duration).getHours() : '0' + new Date(item.duration).getHours()}ч 
                      : ${new Date(item.duration).getMinutes() < 10 ? '0' + new Date(item.duration).getMinutes() : new Date(item.duration).getMinutes()}м`
      let countOfStops = null
      switch (item.stops.length) {
        case 0: countOfStops = `Без пересадок`
          break;
        case 1: countOfStops =`1 пересадка`
          break;          
        case 2: countOfStops =`2 пересадки`
          break;          
        case 3: countOfStops =`3 пересадки`
          break;          
        case 4: countOfStops =`4 пересадки`
          break;
        default:
          break;
      } 
      return `
        <div class="flight__case">
          <div>${item.origin} – ${item.destination}<p>${dateStart} - ${dateEnd}</p>
          </div>
          <div>В ПУТИ<p>${duration}</p>
          </div>
          <div>${countOfStops}<p>${item.stops}</p>
          </div>
        </div>
      `
    }) 
    return template.join('')
  }
}

export default Segments
