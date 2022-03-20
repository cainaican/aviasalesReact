class Companies {
  _companies = []
  constructor(){}

  fetchList(){
    const listOfCompanies = fetch(`./json/companies.json`)
    return listOfCompanies
      .then(res => res.json())
      .then(data => {
        this._companies = [...data]
      })
      .catch(e => console.warn(e.message))
  }

  createTemplate(id){

    let item = this._companies.find((c) => c.id === id)
    //id --> src на лого

    return `<img id=""${item.id}class="header__logo-img" src="./img/${item.logo}" alt="company-logo" />`
  }
}

export default Companies