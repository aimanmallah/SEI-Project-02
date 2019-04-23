import React from 'react'

const CocktailCard = (props) => {
  return(

    <div className="card">
      <div className="card-image">
        <figure>
          {<img src ={props.strDrinkThumb} alt={props.strDrink} />}
        </figure>
      </div>
      <div className="card-content">
        <div className="title is-5">{props.strDrink}</div>
      </div>
    </div>

  )
}

export default CocktailCard
