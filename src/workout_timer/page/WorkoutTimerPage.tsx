import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';
import useWorkoutTimerControl from '../control/WorkoutTimerControl';
import WorkoutTimerProps from '../props/WorkoutTimerProps';

interface WorkoutConfigurationProps {
  workoutTimerControl: WorkoutTimerProps;
  configured: boolean;
  setConfigured: Function;
}

interface WorkoutProps {
  workoutTimerControl: WorkoutTimerProps;
}

const WorkoutConfiguration: React.FC<WorkoutConfigurationProps> = props => {
  const [intervalTime, setIntervalTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [rounds, setRounds] = useState(0);
  return (
    <Card>
      <Card.Body>
        <Card.Title>Configuration</Card.Title>

        <InputGroup as={Col} className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Interval Time</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            min={0}
            max={100}
            type="number"
            step="5"
            placeholder="interval time in sec"
            isInvalid={isNaN(intervalTime)}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setIntervalTime(parseInt(event.currentTarget.value))
            }
            disabled={props.configured}
          />
          <InputGroup.Append>
            <InputGroup.Text>sec</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>

        <InputGroup as={Col} className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Break Time</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            min={0}
            max={100}
            type="number"
            step="5"
            placeholder="break time in sec"
            isInvalid={isNaN(breakTime)}
            onChange={(event: React.FormEvent<HTMLInputElement>) => setBreakTime(parseInt(event.currentTarget.value))}
            disabled={props.configured}
          />
          <InputGroup.Append>
            <InputGroup.Text>sec</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>

        <InputGroup as={Col} className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text># Rounds</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            min={0}
            max={30}
            type="number"
            step="1"
            placeholder="# rounds"
            isInvalid={isNaN(rounds)}
            onChange={(event: React.FormEvent<HTMLInputElement>) => setRounds(parseInt(event.currentTarget.value))}
            disabled={props.configured}
          />
          <InputGroup.Append>
            <InputGroup.Text>Rounds</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <Row>
          <Col>
            <Button
              onClick={() => {
                props.setConfigured(true);
                props.workoutTimerControl.setInitialWorkoutTimerState({
                  intervalTime: intervalTime,
                  breakTime: breakTime,
                  rounds: rounds,
                });
              }}
              disabled={props.configured}
            >
              Submit
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => {
                props.setConfigured(false);
                props.workoutTimerControl.setCountDown(false);
              }}
              disabled={!props.configured}
            >
              Configure
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const WorkoutTimer: React.FC<WorkoutProps> = props => {
  let audioBeforeStart = new Audio("https://raw.githubusercontent.com/jkling2/workout-client/master/sounds/beforeStart321.wav")
  audioBeforeStart.addEventListener('ended', () => props.workoutTimerControl.setCountDown(true));

  const playAudio = (audio: HTMLAudioElement) => {
    audio.play();
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Workout</Card.Title>
        <Card.Text>
          {props.workoutTimerControl.initialWorkoutTimerState.intervalTime} sec PUSH - 
          {props.workoutTimerControl.initialWorkoutTimerState.breakTime} sec
          REST - {props.workoutTimerControl.initialWorkoutTimerState.rounds} times
        </Card.Text>
        {props.workoutTimerControl.initialWorkoutTimerState.rounds - props.workoutTimerControl.currentWorkoutTimerState.rounds}/{props.workoutTimerControl.initialWorkoutTimerState.rounds} Rounds
        <ProgressBar
          now={props.workoutTimerControl.currentWorkoutTimerState.intervalTime}
          label={`${props.workoutTimerControl.currentWorkoutTimerState.intervalTime}sec`}
          max={props.workoutTimerControl.initialWorkoutTimerState.intervalTime}
        />
        <ProgressBar
          now={props.workoutTimerControl.currentWorkoutTimerState.breakTime}
          label={`${props.workoutTimerControl.currentWorkoutTimerState.breakTime}sec`}
          max={props.workoutTimerControl.initialWorkoutTimerState.breakTime}
        />
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant="primary" size="lg" active onClick={() => playAudio(audioBeforeStart)}>
              Start
            </Button>
          </ButtonGroup>
          <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant="secondary" active onClick={() => props.workoutTimerControl.setCountDown(false)}>
              Break
            </Button>
          </ButtonGroup>
          <ButtonGroup className="mr-2" aria-label="First group">
            <Button variant="primary" size="lg" active onClick={() => props.workoutTimerControl.setCountDown(false)}>
              Stop
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Card.Body>
    </Card>
  );
};

const WorkoutTimerPage: React.FC = () => {
  const workoutTimerControl = useWorkoutTimerControl();

  const [configured, setConfigured] = useState(false);

  if (configured) {
    return (
      <>
        <WorkoutConfiguration
          workoutTimerControl={workoutTimerControl}
          configured={configured}
          setConfigured={setConfigured}
        />
        <WorkoutTimer
          workoutTimerControl={workoutTimerControl}
        />
      </>
    );
  } else {
    return (
      <>
        <WorkoutConfiguration
          workoutTimerControl={workoutTimerControl}
          configured={configured}
          setConfigured={setConfigured}
        />
      </>
    );
  }
};

export default WorkoutTimerPage;
