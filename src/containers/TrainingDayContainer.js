import { connect } from 'react-redux';
import { getDays, deleteDay } from '../actions/dayActions';
import TrainingDay from '../components/TrainingDay'


const gettDays = (state) => {
  return state
}
////////////////find some way to get the days directly off of the state. idk why they are not on the state to begin with man



const mapStateToProps = state => ({
  days: gettDays(state)
});

export default connect(
  mapStateToProps
  
)(TrainingDay);
