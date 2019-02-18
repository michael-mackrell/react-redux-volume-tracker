import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Row, Col } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getDays, deleteDay } from '../actions/dayActions';
import VolumeTracking from './volume/VolumeTracking'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class DayList extends Component {
  componentDidMount() {
    this.props.getDays();
  }

  onDeleteClick = id => {
    this.props.deleteDay(id);
  };

  /**
   * makes a list of all exercise and combines volumes on days with
   * duplicate entries
   * @param {} days 
   */
  makeAllExercisesAndCombineVolumes(days){
    
    let exerciseEntry = {}
    let bigExerciseArray = [];
    let duplicateEntriesCheck = ""
    for (let i = 0; i < days.length; i++){
      for (let j = 0; j < days[i].exercises.length; j++){
        if (days[i].exercises[j].dayId === duplicateEntriesCheck && days[i].exercises[j].exName === bigExerciseArray[bigExerciseArray.length - 1].exerciseName) {
          //add the volumes
          bigExerciseArray[bigExerciseArray.length - 1].exVolume += days[i].exercises[j].volume
        } else {
          //just add the entry
          bigExerciseArray.push(exerciseEntry = {
            exVolume: days[i].exercises[j].volume,
            dayId: days[i].exercises[j].dayId,
            exerciseName: days[i].exercises[j].exName
          })
          duplicateEntriesCheck = bigExerciseArray[bigExerciseArray.length - 1].dayId
       }
      }
    }
    return bigExerciseArray
  }


  


  render() {
    const { days } = this.props.day;
    return (
      <Container>
        <Row>
          <Col>
          <ListGroup>
            <TransitionGroup className="day-list">
              {days.map(({ _id, name }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  
                    <Link to={"/trainingday" + name + "/" + _id}  >{name}</Link>
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
          </Col>
          <Col>
          {(days.length > 0) ?  <VolumeTracking exerciseList={this.makeAllExercisesAndCombineVolumes(days)}  ></VolumeTracking> : <p>list loading</p>}
          </Col>
        </Row>
      </Container>
    );
  }
}


DayList.propTypes = {
  getDays: PropTypes.func.isRequired,
  day: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  day: state.day
});

export default connect(
  mapStateToProps,
  { getDays, deleteDay }
)(DayList);


