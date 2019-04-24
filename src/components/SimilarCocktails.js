import React from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

class SimilarCocktails extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      data: []
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    this.getData()
  }

  getData() {

    console.log(this.props.ingredients)

    const randomIngredient = this.props.ingredients[Math.floor(Math.random() * this.props.ingredients.length)]

    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${randomIngredient.drink}`)
      .then(res =>{
        const drinks = res.data.drinks.slice(0,5)
        this.setState({ data: drinks })
      })
  }


  handleClick(){
    this.getData()
    console.log('new data')

  }

  render() {
    return(
      <div>
        <div className="subtitle is-4">Similar cocktails</div>
        <div className="columns">
          {this.state.data.map(drink =>
            <div key={drink.idDrink} className="column is-one-fifth-desktop is-one-third-tablet">
              <Link to={`/cocktails/${drink.idDrink}`} onClick={() => {
                setTimeout(this.props.getData, 1)
                this.handleClick()
              }
              }>
                <div className="card">
                  <div className="card-image">
                    <figure>
                      {<img src ={drink.strDrinkThumb} alt={drink.strDrink} />}
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="subtitle is-6">{drink.strDrink}</div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default SimilarCocktails
