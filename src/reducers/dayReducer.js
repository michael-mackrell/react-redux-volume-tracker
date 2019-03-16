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
      return stateArray

    case ADD_ENTRY_TO_DAY:
    console.log(action.payload);


    
    for (let i = 0; i < state.days.length; i++) {

      if (state.days[i]._id === action.payload.dayId){
        const modThisDay = {...state.days[i], exercises: state.days[i].exercises.concat([{
          exName: action.payload.exName,
          sets: action.payload.sets,
          reps: action.payload.reps,
          weight: action.payload.weight,
          volume: action.payload.volume,
          dayId: action.payload.dayId,
          exId: state.days[i].exercises.length}])};
          console.log(state.days[i].exercises)

        return  {
          ...state,
          days: [
            ...state.days.slice(0, i),
            modThisDay,
            ...state.days.slice(i + 1)
          ] 
        };

        
      }
    }
      
    case DELETE_EXERCISE:
      for (let i = 0; i < state.days.length; i++) {

        if (state.days[i]._id === action.payload.dayId){
          
          const modThisDay = {...state.days[i], exercises: state.days[i].exercises.filter(exercise => exercise.exId !== action.payload.exId)};
          console.log(modThisDay);
          return  {
            ...state,
            days: [
              ...state.days.slice(0, i),
              modThisDay,
              ...state.days.slice(i + 1)
            ] 
          };
        }
      }

    default:
      return state;
  }
}




// return [
//   ...state[action.payload.dayId].exercises,
//     [...state[action.payload.dayId].exercises, {
//     exName: action.payload.text,
//     sets: action.payload.sets,
//     reps: action.payload.reps,
//     weight: action.payload.weight,
//     volume: action.payload.volume,
//     dayId: action.payload.dayId}]
// ]