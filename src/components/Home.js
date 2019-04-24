import React from 'react'
import axios from 'axios'

import CocktailIndex from './CocktailIndex'
import RandomCocktail from './RandomCocktail'

class Home extends React.Component {
  constructor(){
    super()

    this.state = {
      search: [],
      data: null,
      filter: 'ingredient'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  handleChange(e){
    const searchData = ({ ...this.state.search, [e.target.name]: e.target.value })
    this.setState({search: searchData})
  }

  handleSubmit(e) {
    e.preventDefault()
    const endpoint = this.state.filter === 'ingredient' ? 'filter' : 'search'

    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/${endpoint}.php?i=${this.state.search.searchInput}`)
      .then(res => this.setState({ data: res.data }))
      .then(() => this.searchResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  handleFilterChange(e){
    const filter = e.target.value
    this.setState({filter: filter})
  }


  render() {
    return(
      <section>
        <RandomCocktail />
        <div className="container">
          <section className="section" ref={elem => this.searchResultsSection = elem}>
            <form onSubmit={this.handleSubmit}>

              <div className="field">
                <div className="control" onChange={this.handleFilterChange}>
                  <label className="radio">
                    <input type="radio" name="searchFilter" value="ingredient" defaultChecked={true} /> Ingredient
                  </label>
                  <label className="radio">
                    <input type="radio" name="searchFilter" value="name" /> Cocktail name
                  </label>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="searchInput"
                    placeholder="eg. Gin or Margarita"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <button className="button is-primary">Search</button>
            </form>
          </section>
          <section className="section">
            <CocktailIndex {...this.state.data}/>
          </section>
        </div>
      </section>
    )
  }

}

export default Home
