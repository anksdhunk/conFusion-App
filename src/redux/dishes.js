import * as ActionTypes from './ActionTypes';

//state = DISHES,just DISHES is no more longer state here
export const Dishes = (state = {
    isLoading:true,
    errMess:null,
    dishes:[]
}, action) => {

    switch(action.type) {

        //intially we don't have dishes, so isLoading = true, the moment we call ADD_DISHES action -> isLoading should be set to false
        //once you fetch the dish info from the server set isLoading to False
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading : false, errMess:null, dishes:action.payload};

        //spread op is used to use same state (will provide the current value of state), the other parameters will be applied as modifications to the current value of state, state itself will not get mutated
        //errMess:null, dishes: [], maybe in b/w we are refreshing from the server, we may want this way
        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading : true, errMess:null, dishes:[]};
        
        //if the dishes fail to load, payload in the action will contain err Mess 
        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading : false, errMess:action.payload, dishes:[]};
        default:
            return state;
    }
}