import axios from 'axios';
import { GET_DAYS, ADD_DAY, DELETE_DAY, DAYS_LOADING, ADD_ENTRY_TO_DAY, UPDATE_ENTRY, DELETE_EXERCISE } from './types';

export const getDays = () => dispatch => {
  dispatch(setDaysLoading());
  axios.get('/api/days').then(res =>
    dispatch({
      type: GET_DAYS,
      payload: res.data
    })
  );
};

export const addDay = day => dispatch => {
  axios.post('/api/days', day).then(res =>
    dispatch({
      type: ADD_DAY,
      payload: res.data
    })
  );
};

export const addExerciseToDay = exercise => dispatch => {  
  axios.put(`/api/days/${exercise.dayId}`, exercise).then(res =>
    dispatch({
      type: ADD_ENTRY_TO_DAY,
      payload: res.data
    })
  )
}

export const editExercise = exercise => dispatch => {  
  axios.put(`/api/days/${exercise.dayId}/${exercise.exId}`, exercise).then(res =>
    dispatch({
      type: UPDATE_ENTRY,
      payload: res.data
    })
  )
}

export const removeExercise = exercise => dispatch => {  
  console.log("2q")
  console.log(exercise)
  axios.put(`/api/days/deleteExercise/${exercise.dayId}/${exercise.exId}`, exercise).then(res => {
    dispatch({
      type: DELETE_EXERCISE,
      payload: exercise
    })
  }
    
  )
}

export const deleteDay = id => dispatch => {
  axios.delete(`/api/days/${id}`).then(res =>
    dispatch({
      type: DELETE_DAY,
      payload: id
    })
  );
};

export const setDaysLoading = () => {
  return {
    type: DAYS_LOADING
  };
};
