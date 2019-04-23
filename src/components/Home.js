import React from 'react'

import axios from 'axios'

import CocktailIndex from './CocktailIndex'

class Home extends React.Component {
  constructor(){
    super()

    this.state = {
      search: [],
      data: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    const searchData = ({ ...this.state.search, [e.target.name]: e.target.value })
    this.setState({search: searchData})
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.state.search.searchInput}`)
      .then(res => this.setState({ data: res.data }))
  }

  render() {
    console.log(this.state.data)
    return(
      <section className="section">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                name="searchInput"
                placeholder="Search for a Cocktail"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button className="button is-primary">Search</button>
        </form>
        <section className="section">
          <CocktailIndex {...this.state.data}/>
        </section>
      </section>
    )
  }

}

export default Home
