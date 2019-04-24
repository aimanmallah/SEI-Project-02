import React from 'react'
import axios from 'axios'

import SimilarCocktails from './SimilarCocktails'

class CocktailShow extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      cocktail: null
    }

    this.getData = this.getData.bind(this)
  }

  componentDidMount(){
    this.getData()
  }

  componentDidUpdate(){
    this.getData()
  }

  getData(){
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php', {
      params: {
        i: this.props.match.params.id
      }
    })
      .then(res => {
        const data = res.data.drinks[0]

        const drinks = Object.keys(data)
          .filter(key => key.match(/ingredient/i))
          .filter(key => !!data[key] || data[key] === ' ')
          .map(key => data[key].trim())

        const measures = Object.keys(data)
          .filter(key => key.match(/measure/i))
          .filter(key => !!data[key] || data[key] === ' ')
          .map(key => data[key].trim())

        const ingredients = drinks.map((drink, index) => {
          return { drink: drinks[index], measure: measures[index] }
        })

        const cocktail = {
          image: data.strDrinkThumb,
          name: data.strDrink,
          instructions: data.strInstructions,
          glass: data.strGlass,
          alcoholic: data.strAlcoholic,
          category: data.strCategory,
          id: data.idDrink,
          ingredients
        }

        this.setState({ cocktail })
      })
  }

  render() {
    console.log(this.state.cocktail)
    if(!this.state.cocktail) return null
    return (
      <div className="container">
        <section className="section">
          <div className="columns">
            <div className="column is-one-third-desktop">
              <img src={this.state.cocktail.image} alt={this.state.cocktail.name} />
            </div>
            <div className="column is-two-thirds-desktop">
              <div className="title is-3">{this.state.cocktail.name}</div>
              <hr />
              <div className="column is-full-width">
                <div className="headerDetails"><strong>Category:</strong> {this.state.cocktail.category}</div>
                <div className="headerDetails"><strong>Glass to use:</strong> {this.state.cocktail.glass}</div>
                <div className="headerDetails"><strong>Type:</strong> {this.state.cocktail.alcoholic}</div>
              </div>
              <hr />
              <div className="columns">
                <div className="column is-one-half">
                  <div className="subtitle is-4">Ingredients</div>
                  <div className="content">
                    <ul>
                      {this.state.cocktail.ingredients.map(ingredient =>
                        <li key={ingredient.drink}><strong>{ingredient.drink}</strong> {ingredient.measure}</li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="column is-one-half">
                  <div className="subtitle is-4">Instructions</div>
                  <p>{this.state.cocktail.instructions}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="container">
            <SimilarCocktails {...this.state.cocktail} />
          </div>
        </section>
      </div>
    )
  }
}

export default CocktailShow
