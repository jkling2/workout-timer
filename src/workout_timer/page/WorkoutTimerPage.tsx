import React, { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import useWorkoutTimerControl from '../control/WorkoutTimerControl';
import WorkoutConfiguration from '../display/WorkoutConfigurationDisplay';
import WorkoutTimer from '../display/WorkoutTimerDisplay';
import { WorkoutTimerContext } from '../context/WorkoutTimerContext';

const WorkoutTimerPage: React.FC = () => {
  const workoutTimerControl = useWorkoutTimerControl();
  const { configured } = useContext(WorkoutTimerContext);

  return (
    <Container>
      <Row className="mt-3 justify-content-center">
        <WorkoutConfiguration setCountDown={workoutTimerControl.setCountDown} />
      </Row>
      {configured && (
        <Row className="mt-3 justify-content-center">
          <WorkoutTimer workoutTimerControl={workoutTimerControl} />
        </Row>
      )}
    </Container>
  );
};

export default WorkoutTimerPage;
