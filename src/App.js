import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import DayList from './components/DayList';
import DayModal from './components/DayModal';
import { Container } from 'reactstrap';



import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      
        <div className="App">
          <AppNavbar />
          <Container>
            <DayModal />
            <DayList />
            
          </Container>
        </div>

    );
  }
}






export default App;
