import * as  actionTypes from './actions'


const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0
    },
    totalPrice : 50,
    displayError: false,
    orderData: [],
    purchaseSuccess: false,
    loading: false,
    orders: [],
    ordersLoading: true,
    authComplete: false,

    localId: null,
    error: "",
    idToken: null,
    displayToast: false,
    authFailed: false
}

const PRICE = {
    salad: 5,
    meat: 20,
    bacon: 10,
    cheese: 10
}

const addIngredient = (state, action) =>{
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName]  + 1
        },
        totalPrice : state.totalPrice + PRICE[action.ingredientName]
    } 
}

const deleteIngredients = (state, action) => {
    if(state.ingredients[action.ingredientName] > 0){
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName]  - 1
            },
            totalPrice : state.totalPrice - PRICE[action.ingredientName]
        } 
    }
    else{
        return{...state}
    }
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.HANDLE_INCREMENT: return addIngredient(state, action)
           
        
        case actionTypes.HANDLE_DECREMENT: return deleteIngredients(state, action)
           
           
        case actionTypes.HANDLE_RESET:
            return {
                ...state,
                ingredients: {
                    ...initialState.ingredients
                },
                totalPrice: initialState.totalPrice
            
            }

        case actionTypes.INIT_INGREDIENTS:
            return{
                ...state,
                ingredients : {...action.ingredients}
            } 

        case actionTypes.INIT_INGREDIENTS_FAILED:
            return{
                ...state,
                displayError: true
            }
            
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return{
                ...state,
                orderData: state.orderData.concat(action.orderData),
                purchaseSuccess: true,
                loading: false,
                totalPrice: initialState.totalPrice
            }
            
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.SET_PURCHASE_FLAG:
            return{
                ...state,
                purchaseSuccess: false,
            }
        case actionTypes.FETCH_ORDER_START:
            let orders = []
            for(let order in action.orders){
                orders.push(action.orders[order])
            }

            return{
                ...state,
                ordersLoading: false,
                orders: orders
            }

            case actionTypes.AUTH_START:
                return{
                    ...state,
                    authStart: true
                }
        
            case actionTypes.AUTH_SUCCESS:
                return{
                    ...state,
                    error: "",
                    authComplete: true,
                    idToken: action.idToken,
                    displayToast: true
                }

            case actionTypes.AUTH_FAIL:
                console.log()
                return{
                    ...state,
                    authComplete: true,
                    authFailed: true,
                    error: action.payload.response.data.error.message
                }
            case actionTypes.AUTH_LOGOUT:
                return{
                    ...state,
                    idToken: null,
                    localId: null,
                    authComplete: false,
                    authFailed: false
                }
            case actionTypes.AUTH_DISPLAY_TOAST:                
                return{
                    ...state,
                    displayToast: !state.displayToast
                }

        default:
           return state;        
    }
}


export default reducer;