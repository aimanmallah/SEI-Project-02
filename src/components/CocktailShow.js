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
            <div className="content">
              <div className="subtitle is-3">Ingredients</div>
              {this.state.cocktail.ingredients.map(ingredient =>
                <p key={ingredient.drink}>{ingredient.drink}: {ingredient.measure}</p>
              )}
            </div>
          </div>

        </div>
      </section>
    )
  }
}

export default CocktailShow
