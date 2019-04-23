import React from 'react'
import axios from 'axios'

class CocktailShow extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      cocktail: null
    }
  }

  componentDidMount(){
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php', {
      params: {
        i: this.props.match.params.id
      }
    })
      .then(res => {
        const drinks = Object.keys(res.data.drinks[0])
          .filter(key => key.match(/ingredient/i))
          .filter(key => res.data.drinks[0][key].trim())
          .map(key => res.data.drinks[0][key].trim())

        const measures = Object.keys(res.data.drinks[0])
          .filter(key => key.match(/measure/i))
          .filter(key => res.data.drinks[0][key].trim())
          .map(key => res.data.drinks[0][key].trim())

        const ingredients = drinks.map((drink, index) => {
          return { drink: drinks[index], measure: measures[index] }
        })

        const cocktail = {
          image: res.data.drinks[0].strDrinkThumb,
          name: res.data.drinks[0].strDrink,
          instructions: res.data.drinks[0].strInstructions,
          glass: res.data.drinks[0].strGlass,
          alcoholic: res.data.drinks[0].strAlcoholic,
          category: res.data.drinks[0].strCategory,
          ingredients
        }

        this.setState({ cocktail })
      })
  }

  render() {
    console.log(this.state)
    if(!this.state.cocktail) return null
    return (
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
      </section>
    )
  }
}

export default CocktailShow
