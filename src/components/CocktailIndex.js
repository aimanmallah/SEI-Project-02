import React from 'react'

import CocktailCard from './CocktailCard'

class CocktailIndex extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    if(!this.props.drinks) return null
    return(
      <div className="columns is-multiline">

        {this.props.drinks.map(cocktail =>
          <div key={cocktail.idDrink} className="column is-one-fifth-desktop is-one-half-tablet">
            <CocktailCard {...cocktail}/>
          </div>

        )}
      </div>
    )
  }
}

export default CocktailIndex
