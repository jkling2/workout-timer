import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ProgressBar from 'react-bootstrap/ProgressBar';
import useWorkoutTimerControl from '../control/WorkoutTimerControl';
import WorkoutTimerProps from '../props/WorkoutTimerProps';
import WorkoutFinishedDisplay from '../display/WorkoutFinishedDisplay';

interface WorkoutConfigurationProps {
  workoutTimerControl: WorkoutTimerProps;
  configured: boolean;
  setConfigured: Function;
}

interface WorkoutProps {
  workoutTimerControl: WorkoutTimerProps;
}

const WorkoutConfiguration: React.FC<WorkoutConfigurationProps> = props => {
  const [intervalTime, setIntervalTime] = useState(-1);
  const [breakTime, setBreakTime] = useState(-1);
  const [rounds, setRounds] = useState(-1);
  const [validRounds, setValidRounds] = useState(true);
  const [validIntervalTime, setValidIntervalTime] = useState(true);
  return (
    <Card id="card-fg">
      <Card.Body>
        <Card.Title id="card-title-fg">Configuration</Card.Title>
        <InputGroup as={Col} className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Interval Time</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            bsPrefix="form-control form-fg"
            type="text"
            pattern="[0-9]*"
            placeholder="interval time in sec"
            isInvalid={!validIntervalTime}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setIntervalTime(parseInt(event.currentTarget.value))
            }
            disabled={props.configured}
          />
          <InputGroup.Append>
            <InputGroup.Text id="prepend-radius">sec&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</InputGroup.Text>
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">
              Please set a numerical Interval Time e.g. <strong>20</strong>.
          </Form.Control.Feedback>
        </InputGroup>

        <InputGroup as={Col} className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>&nbsp;&nbsp;&nbsp;Break Time</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            bsPrefix="form-control form-fg"
            type="text"
            pattern="[0-9]*"
            placeholder="break time in sec"
            onChange={(event: React.FormEvent<HTMLInputElement>) => setBreakTime(parseInt(event.currentTarget.value))}
            disabled={props.configured}
          />
          <InputGroup.Append>
            <InputGroup.Text>sec&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>

        <InputGroup as={Col} className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Rounds</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            bsPrefix="form-control form-fg"
            type="text"
            pattern="[0-9]*"
            placeholder="# rounds"
            isInvalid={!validRounds}
            onChange={(event: React.FormEvent<HTMLInputElement>) => setRounds(parseInt(event.currentTarget.value))}
            disabled={props.configured}
          />
          <InputGroup.Append>
            <InputGroup.Text id="prepend-radius">Rounds</InputGroup.Text>
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">
              Please set a numerical # Rounds e.g. <strong>1</strong>.
          </Form.Control.Feedback>
        </InputGroup>
        <Row className="justify-content-center">
          <Button
            id="button-fg"
            className="mr-2"
            onClick={() => {
              if (intervalTime > 0 && rounds > 0) {
                setValidRounds(true);
                setValidIntervalTime(true);
                props.setConfigured(true);
                props.workoutTimerControl.setInitialWorkoutTimerState({
                  intervalTime: intervalTime,
                  breakTime: isNaN(breakTime) ? -1 : breakTime,
                  rounds: rounds,
                });
              } else if (intervalTime > 0) {
                setValidIntervalTime(true);
                setValidRounds(false);
              } else if (rounds > 0) {
                setValidRounds(true);
                setValidIntervalTime(false);
              } else {
                setValidRounds(false);
                setValidIntervalTime(false);
              }
            }}
            disabled={props.configured}
          >
            Submit
          </Button>
          <Button
            id="button-fg"
            className="ml-2"
            onClick={() => {
              props.setConfigured(false);
              props.workoutTimerControl.setCountDown(false);
            }}
            disabled={!props.configured}
          >
            Configure
          </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

const WorkoutTimer: React.FC<WorkoutProps> = props => {
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);
  
  enum WorkoutState {
    INITIAL,
    RUNNING,
    PAUSED,
    STOPPED,
    DONE,
  }
  const [workoutState, setWorkoutState] = useState(WorkoutState.INITIAL);
  
  const audioBeforeStart = new Audio(
    'https://raw.githubusercontent.com/jkling2/workout-timer/master/public/sounds/beforeStart321.wav',
  );
  audioBeforeStart.addEventListener('ended', () => {
    setAudioIsPlaying(false);
    setWorkoutState(WorkoutState.RUNNING);
  });

  const runWorkout = () => {
    if (workoutState === WorkoutState.INITIAL) {
      setAudioIsPlaying(true);
      audioBeforeStart.play();
    } else {
      setWorkoutState(WorkoutState.RUNNING);
    }
  };

  useEffect(() => {
    if (props.workoutTimerControl.done) {
      setWorkoutState(WorkoutState.DONE);
    }
  }, [props.workoutTimerControl.done, WorkoutState.DONE]);

  useEffect(() => {
    switch (workoutState) {
      case WorkoutState.INITIAL:
        props.workoutTimerControl.resetWorkout();
        break;
      case WorkoutState.RUNNING:
        props.workoutTimerControl.setCountDown(true);
        break;
      case WorkoutState.PAUSED:
        props.workoutTimerControl.setCountDown(false);
        break;
      case WorkoutState.STOPPED:
        props.workoutTimerControl.setCountDown(false);
        break;
      default:
      // code block
    }
  }, [
    workoutState,
    WorkoutState.INITIAL,
    WorkoutState.RUNNING,
    WorkoutState.PAUSED,
    WorkoutState.STOPPED,
    props.workoutTimerControl,
  ]);

  const BreakProgressBar: React.FC = () => {
    if (props.workoutTimerControl.currentWorkoutTimerState.breakTime >= 0 && props.workoutTimerControl.currentWorkoutTimerState.rounds > 1) {
      return (
        <Row xs="1" className="mt-3 ml-3 mr-3">
          <ProgressBar
            bsPrefix="fgl-progress"
            animated
            now={props.workoutTimerControl.currentWorkoutTimerState.breakTime}
            label={`${props.workoutTimerControl.currentWorkoutTimerState.breakTime}sec`}
            max={props.workoutTimerControl.initialWorkoutTimerState.breakTime}
          />
        </Row>
      )
    } else {
      return (
        <> </>
      )
    }
  }

  return (
    <>
    <WorkoutFinishedDisplay
          show={workoutState === WorkoutState.DONE || workoutState === WorkoutState.STOPPED}
          completedSuccessfull={workoutState === WorkoutState.DONE}
          reset={() => setWorkoutState(WorkoutState.INITIAL)}
          quit= {() => setWorkoutState(WorkoutState.PAUSED)}
          />
    <Card id="card-fg">
      <Card.Body>
        <Card.Title id="card-title-fg">Workout</Card.Title>
        <Card.Text className="mt-3 ml-3 mr-3">
          {props.workoutTimerControl.initialWorkoutTimerState.intervalTime} sec PUSH -&nbsp;
          {props.workoutTimerControl.initialWorkoutTimerState.breakTime} sec REST -&nbsp;
          {props.workoutTimerControl.initialWorkoutTimerState.rounds} times
        </Card.Text>
        <Card.Text className="mt-3 ml-3 mr-3">
          {props.workoutTimerControl.initialWorkoutTimerState.rounds -
            props.workoutTimerControl.currentWorkoutTimerState.rounds}
          /{props.workoutTimerControl.initialWorkoutTimerState.rounds} Rounds
        </Card.Text>
        <Row xs="1" className="mt-3 ml-3 mr-3">
          <ProgressBar
            bsPrefix="fg-progress"
            animated
            now={props.workoutTimerControl.currentWorkoutTimerState.intervalTime}
            label={`${props.workoutTimerControl.currentWorkoutTimerState.intervalTime}sec`}
            max={props.workoutTimerControl.initialWorkoutTimerState.intervalTime}
          />
        </Row>
        <BreakProgressBar />
        <Row className="mt-3 justify-content-center">
          <ButtonToolbar aria-label="Toolbar with button groups">
            <Button
              id="button-fg"
              className="mr-2"
              size="lg"
              active
              onClick={runWorkout}
              disabled={
                workoutState === WorkoutState.RUNNING || audioIsPlaying ||
                props.workoutTimerControl.initialWorkoutTimerState.intervalTime === 0 ||
                props.workoutTimerControl.initialWorkoutTimerState.rounds === 0
              }
            >
              {workoutState === WorkoutState.INITIAL && !audioIsPlaying ? "Start" : "Continue"}
            </Button>
            <Button
              variant="secondary"
              className="mr-2"
              active
              onClick={() => setWorkoutState(WorkoutState.PAUSED)}
              disabled={workoutState !== WorkoutState.RUNNING}
            >
              Break
            </Button>
            <Button
              id="button-fg"
              className="mr-2"
              size="lg"
              active
              onClick={() => setWorkoutState(WorkoutState.STOPPED)}
              disabled={workoutState !== WorkoutState.RUNNING && workoutState !== WorkoutState.PAUSED}
            >
              Stop
            </Button>
          </ButtonToolbar>
        </Row>
      </Card.Body>
    </Card>
    </>
  );
};

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
