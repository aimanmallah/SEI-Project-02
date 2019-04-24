import React from 'react'

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

        const drinks = res.data.drinks.slice(0,3)
        console.log(drinks)

        this.setState({ data: drinks })
      })
  }


  render() {
    console.log(this.state.data, 'props')
    return(
      <div>
        {this.state.data.map(drink =>
          <div key={drink.idDrink}>{drink.strDrink}</div>
        )}
      </div>
    )
  }
}

export default SimilarCocktails
