import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class RandomCocktail extends React.Component {

  constructor(){
    super()

    this.state = {
      data: []
    }

    this.handleRandomCocktail = this.handleRandomCocktail.bind(this)
  }

  componentDidMount(){
    this.getData()
  }

  getData() {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(res => {
        const cocktail = {
          image: res.data.drinks[0].strDrinkThumb,
          name: res.data.drinks[0].strDrink,
          id: res.data.drinks[0].idDrink
        }
        this.setState({ cocktail })
      })
  }

  handleRandomCocktail(){
    this.getData()
  }

  render(){

    if(!this.state.cocktail) return null
    return(
      <div className="hero is-dark is-bold">
        <div className="hero-body hero-padding">
          <div className="container">
            <div className="columns is-centred">
              <div className="column is-two-thirds-desktop">
                <h1 className="title is-1">Welcome to Cocktail Bored</h1>
                <h2 className="subtitle">Try the cocktail shaker for a random cocktail</h2>
              </div>
              <div className="column is-one-third has-text-centred">
                <button className="button random-cocktail-button" onClick={this.handleRandomCocktail}>Shake me a cocktail</button>
                <Link to={`/cocktails/${this.state.cocktail.id}`}><div className="subtitle is-size-3">{this.state.cocktail.name}</div></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RandomCocktail
