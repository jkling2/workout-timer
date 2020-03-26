import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import WorkoutTimerPage from './workout_timer/page/WorkoutTimerPage';

const WorkoutApp = () => {
  return (
    <>
      <header>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">WorkoutApp</Navbar.Brand>
        </Navbar>
      </header>
      <main>
          <WorkoutTimerPage />  
      </main>
    </>
  );
};

export default WorkoutApp;
