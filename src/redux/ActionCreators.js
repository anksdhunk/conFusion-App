import * as ActionTypes from './ActionTypes'
import { DISHES } from './../shared/dishes';

export const addComment = (dishId,rating,author,comment) => ({

    type: ActionTypes.ADD_COMMENT,
    payload:{
        dishId: dishId,
        rating:rating,
        author:author,
        comment:comment
    }
});


//creating thunk (fetchDishes) to fetch the dishes, it will return a fuction
//inner function gets accessed to dispatch and state
export const fetchDishes = () => (dispatch) => {
    //1st dispatch
    dispatch(dishesLoading(true));
    
    //2nd dispatch, after 2 seconds delay, it will dispatch addDishes, this will push the dishes into the state of the store
    setTimeout(() => {
        dispatch(addDishes(DISHES))
    },2000);
}

//returning an object
export const dishesLoading = () => ({
    //interpretation: this will inform somebody that the dishes are going to be loaded
    type:ActionTypes.DISHES_LOADING
});

//returning an object
export const dishesFailed = (errmess) => ({
    type:ActionTypes.DISHES_FAILED,
    payload: errmess
});

//implement addDishes
//it is taking all the dishes info as the parameters, so it must be creating an action of adding the dishes
//returning an object
export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload:dishes
})
