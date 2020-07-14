import { COMMENTS } from './../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch(action.type) {
        // choose the action type from the options
        case ActionTypes.ADD_COMMENT:
            // payload is javascript object which recieved properties of comments
            var comment = action.payload;
            //comments is a javascript array, its length will tell us the id,comments will go from 0,1,2 and so on, no. of comments can be obtained from state.length
            //Later server will provide us the comment id
            comment.id = state.length;4

            //Generate a date field, date is stored as ISO string in comment object
            comment.date = new Date().toISOString();
            //we cannot modify the state and return it, instead we'll concat the state, and create a new copy of the state and then return it
            return  state.concat(comment);
            //only comments part of the reducer will make the changes
        default:
            return state;
    }
}
