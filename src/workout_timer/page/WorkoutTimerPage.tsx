import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import useWorkoutTimerControl from '../control/WorkoutTimerControl';
import WorkoutConfiguration from '../display/WorkoutConfigurationDisplay';
import WorkoutTimer from '../display/WorkoutTimerDisplay';

const WorkoutTimerPage: React.FC = () => {
  const workoutTimerControl = useWorkoutTimerControl();

  const [configured, setConfigured] = useState(false);

  if (configured) {
    return (
      <>
        <Container>
          <Row className="mt-3 justify-content-center">
            <WorkoutConfiguration
              workoutTimerControl={workoutTimerControl}
              configured={configured}
              setConfigured={setConfigured}
            />
          </Row>
          <Row className="mt-3 justify-content-center">
            <WorkoutTimer workoutTimerControl={workoutTimerControl} />
          </Row>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container>
          <Row className="mt-3 justify-content-center">
            <WorkoutConfiguration
              workoutTimerControl={workoutTimerControl}
              configured={configured}
              setConfigured={setConfigured}
            />
          </Row>
        </Container>
      </>
    );
  }
};

export default WorkoutTimerPage;
