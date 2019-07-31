import React from 'react';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'

let burgerStyles = {
    textAlign: "center",
    height: "250px",
    width: "400px",
    margin: "0 auto",
    overflow: "auto"
}


const Burger = (props) => {
    
        let  TransformedIngredients = Object.keys(props.ings)
        .map(key => {
                return [...Array(props.ings[key])].map( (_, i) => {
                    return <BurgerIngredients key={key + i} type={key} />
                })
            }).reduce((arr, el) => {
                return arr.concat(el)
            }, [])

        if(TransformedIngredients.length === 0){
            TransformedIngredients = <p className="initial-text">Please Start adding Ingredients</p>
        }


        
   
    return ( 
        <div style={burgerStyles}>
            <BurgerIngredients type="top" />
                {TransformedIngredients}
            <BurgerIngredients type="bottom" />
        </div>
     );

}
 
export default Burger;