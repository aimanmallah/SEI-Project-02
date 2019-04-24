import React from 'react'
import { Link, animatedScroll as scroll} from 'react-scroll'
import axios from 'axios'

import CocktailIndex from './CocktailIndex'

class Home extends React.Component {
  constructor(){
    super()

    this.state = {
      search: [],
      data: [],
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
    if(this.state.filter === 'ingredient'){
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${  this.state.search.searchInput}`)
        .then(res => this.setState({ data: res.data }))
    } else {
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.search.searchInput}`)
        .then(res => this.setState({ data: res.data }))
    }
  }

  handleFilterChange(e){
    const filter = e.target.value
    this.setState({filter: filter})
  }

  render() {
    console.log(this.state.data)
    console.log(this.state.filter)
    return(
      <section>
        <div className="hero is-medium is-dark is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Welcome to Cocktail Bored</h1>
              <h2 className="subtitle">Try the random cocktail or search below!</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <section className="section"  id="section1">
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
