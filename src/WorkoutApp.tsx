import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import WorkoutTimerPage from './workout_timer/page/WorkoutTimerPage';
import logo from './img/favicon.svg';
import './WorkoutApp.css'

const WorkoutApp = () => {

  const styles = {
    padTopAfterFixedNavbar: {
      paddingTop: "50px",
    } as React.CSSProperties,
  }

  return (
    <>
      <header>
        <Navbar bg="fg" variant="dark" fixed="top">
          <Navbar.Brand href="#home">
          <img alt="" src={logo} width="30" height="30" className="spin-logo d-inline-block align-top" />&nbsp;&nbsp;WorkoutApp
          </Navbar.Brand>
        </Navbar>
      </header>
      <main style={styles.padTopAfterFixedNavbar}>
      {/*<main style={{paddingTop: "50px"}}> */}  {/*this works too - Inline-Style*/}
          <WorkoutTimerPage />  
      </main>
    </>
  );
};

export default WorkoutApp;
