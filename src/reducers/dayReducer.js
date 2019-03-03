import {
  GET_DAYS,
  ADD_DAY,
  DELETE_DAY,
  DAYS_LOADING,
  ADD_ENTRY_TO_DAY,
  UPDATE_ENTRY,
  DELETE_EXERCISE
} from '../actions/types';

const initialState = {
  days: [],
  loading: false
};

export default function(state = initialState, action) {

  console.log("4")
  switch (action.type) {
    case GET_DAYS:
      return {
        ...state,
        days: action.payload,
        loading: false
      };
    case DELETE_DAY:
      return {
        ...state,
        days: state.days.filter(day => day._id !== action.payload)
      };
    case ADD_DAY:
      return {
        ...state,
        days: [action.payload, ...state.days]
      };
    case DAYS_LOADING:
      return {
        ...state,
        loading: true
      };
    case UPDATE_ENTRY:
      
        var stateArray = state//get the day from the state


        for (let i = 0; i < stateArray.days.length; i++) {

          if (stateArray.days[i]._id === action.payload.day._id){
            for (let j = 0; j < stateArray.days[i].exercises.length; j++) {
              if (stateArray.days[i].exercises[j]._id === action.payload._id) {
                stateArray.days[i].exercises[j] = {
                  exName: action.payload.text,
                  sets: action.payload.sets,
                  reps: action.payload.reps,
                  weight: action.payload.weight,
                  volume: action.payload.volume,
                  dayId: action.payload.dayId}
              }
            }
            
          }
        }
        console.log(stateArray)
      return stateArray

    case ADD_ENTRY_TO_DAY:
  
      return [
        ...state[action.payload.dayId].exercises,
          [...state[action.payload.dayId].exercises, {
          exName: action.payload.text,
          sets: action.payload.sets,
          reps: action.payload.reps,
          weight: action.payload.weight,
          volume: action.payload.volume,
          dayId: action.payload.dayId}]
      ]



    case DELETE_EXERCISE:
console.log(action.payload.day._id)
console.log(state.days[action.payload.day._id])
    let indexOfExercise
    for (let i = 0; i < state.days.length; i++) {

      if (state.days[i]._id === action.payload.day._id){
        return        [...state[action.payload.dayId].exercises, state.days[indexOfExercise].exercises.filter(exercise => exercise._id !== action.payload._id) ]      }
    }

    
    


    default:
      return state;
  }
}







// case ADD_ENTRY_TO_DAY:
  
//       var stateArray = [...state]
//       stateArray[action.payload.dayId].exercises.push({
//         exName: action.payload.text,
//         sets: action.payload.sets,
//         reps: action.payload.reps,
//         weight: action.payload.weight,
//         volume: action.payload.volume,
//         dayId: action.payload.dayId})
//       return stateArray




// var stateArray = state//get the day from the state


// for (let i = 0; i < stateArray.days.length; i++) {

//   if (stateArray.days[i]._id === action.payload.day._id){

//     stateArray.days[i].exercises = stateArray.days[i].exercises.filter(exercise => exercise._id !== action.payload._id)
   
//   }
// }