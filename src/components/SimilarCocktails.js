import React from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

class SimilarCocktails extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.props.ingredients[0].drink}`)
      .then(res =>{
        const drinks = res.data.drinks.slice(0,5)
        this.setState({ data: drinks })
      })
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
