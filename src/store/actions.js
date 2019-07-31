import axios from 'axios'
import { toast } from 'react-toastify';

export const HANDLE_INCREMENT = "HANDLE_INCREMENT"
export const HANDLE_DECREMENT = "HANDLE_DECREMENT"
export const HANDLE_RESET = "HANDLE_RESET"
export const INIT_INGREDIENTS = "INIT_INGREDIENTS"
export const INIT_INGREDIENTS_HELPER = "INIT_INGREDIENTS_HELPER"
export const INIT_INGREDIENTS_FAILED = "INIT_INGREDIENTS_FAILED"
export const PURCHASE_BURGER = "PURCHASE BURGER"
export const PURCHASE_BURGER_SUCCESS = "PURCHASE_BURGER_SUCCESS"
export const PURCHASE_BURGER_START = "PURCHASE_BURGER_START"
export const SET_PURCHASE_FLAG = "SET_PURCHASE_FLAG"

export const FETCH_ORDER_START = "FETCH_ORDER_START";
export const FETCH_ORDER_END = "FETCH_ORDER_END";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_DISPLAY_TOAST = "AUTH_DISPLAY_TOAST"

export const setDisplayToast = () => {
    return{
        type: AUTH_DISPLAY_TOAST
    }   
}



export const handleIncrement = (type) => {
    return {
        type: HANDLE_INCREMENT,
        ingredientName: type
    }
}


export const handleDecrement = (type) => {
    return {
        type: HANDLE_DECREMENT,
        ingredientName: type
    }
}
export const handleReset = () => {
    return {
        type: HANDLE_RESET
    }
}

export const initIngredientsHelper = (ingredients) =>{
    return{
        type: INIT_INGREDIENTS,
        ingredients: ingredients

    }
}

export const initIngredientsFailed = () =>{
    return {
        type: INIT_INGREDIENTS_FAILED
    }
}

export const initIngredients = (ingredients) => {
    return dispatch => {
        return axios.get("https://burger-builder-25101999.firebaseio.com/ingredients.json")
            .then(response => {
                dispatch(initIngredientsHelper(response.data))
            })
           .catch(error => {
                dispatch(initIngredientsFailed())
            })     
    }
}

export const purchaseBurgerSuccess = (orderData) => {
    return{
        type: PURCHASE_BURGER_SUCCESS,
        orderData: orderData
    }
}

export const purchaseBurgerStart = () => {   // SETS LOADING TO TRUE
    return{
        type: PURCHASE_BURGER_START

    }
}

export const purchaseBurger = (orderData, idToken) => {
    
    return dispatch => {

        dispatch(purchaseBurgerStart())
        
        axios.post(`https://burger-builder-25101999.firebaseio.com/orders.json?auth=${idToken}`, orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(orderData))
        })

    }
}

export const setPurchaseFlag = () => {
    return{
        type: SET_PURCHASE_FLAG
    }
}

export const fetchOrderStartHelper = (orders) =>{
    return{
        type: FETCH_ORDER_START,
        orders: orders
    }
}
export const fetchOrderStart = (idToken) =>{
    return dispatch => {
        axios.get('https://burger-builder-25101999.firebaseio.com/orders.json?auth='+ idToken)
        .then(response => {
                dispatch(fetchOrderStartHelper(response.data))              
        })
        .catch(err => {
            console.log(err);
        })
    }
    
}
export const authSuccess = (idToken) =>{
    localStorage.setItem("idToken", idToken.idToken)
    return{
        type: AUTH_SUCCESS,
        idToken: idToken.idToken  
    }
}
export const authFail = (payload) =>{
    return{
        type: AUTH_FAIL,
        payload: payload
        
    }
}


export const authStart = (data, type) => {
    return dispatch => {

        if(type === "signup"){
            axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIhHeh7EChNtyK3BW2JDH1iAoI9uUhbKA", data)
            .then(function(response){
                dispatch(authSuccess(response.data))
            })
            .catch(function(err){
                dispatch(authFail(err))
            })
        }
        else if(type === "login"){
            axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIhHeh7EChNtyK3BW2JDH1iAoI9uUhbKA", data)
            .then(function(response){
                dispatch(authSuccess(response.data))
            })
            .catch(function(err){
                dispatch(authFail(err))
            })
        }

        

    }
}

export const logout = () =>{
    localStorage.removeItem("idToken")
    toast.success("Logged out Successfully", {
        position: toast.POSITION.TOP_CENTER,
        className: "toast",
        hideProgressBar: true,
        autoClose: 3000
    })
    return {
        type: AUTH_LOGOUT
    }
}