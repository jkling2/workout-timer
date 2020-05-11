import React, { useState, useEffect } from 'react';
import { Button, ButtonToolbar, Card, Col, Container, Form, InputGroup, Modal, ProgressBar, Row } from 'react-bootstrap';
import useWorkoutTimerControl from '../control/WorkoutTimerControl';
import WorkoutTimerProps from '../props/WorkoutTimerProps';
import WorkoutFinishedDisplay from '../display/WorkoutFinishedDisplay';
import num3 from '../../3.svg';
import num2 from '../../2.svg';
import num1 from '../../1.svg';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize'

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
  const { width, height } = useWindowSize()
  
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
  const intervalAudio = new Audio();
  audioBeforeStart.addEventListener('ended', () => {
    setAudioIsPlaying(false);
    setWorkoutState(WorkoutState.RUNNING);
  });

  const [showImageModal1, setShowImageModal1] = useState(false);
  const [showImageModal2, setShowImageModal2] = useState(false);
  const [showImageModal3, setShowImageModal3] = useState(false);

  const runWorkout = () => {
    if (workoutState === WorkoutState.INITIAL) {
      setAudioIsPlaying(true);
      setShowImageModal1(true);
      audioBeforeStart.play();
      intervalAudio.play();
      props.workoutTimerControl.setAudio(intervalAudio);
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

  const ImageModal: React.FC = () => {
    const startTimer1 = () => new Promise(resolve => setTimeout(resolve, 1000))
    .then(resolve => {setShowImageModal1(false); setShowImageModal2(true);});
    const startTimer2 = () => new Promise(resolve => setTimeout(resolve, 1000))
    .then(resolve => {setShowImageModal2(false); setShowImageModal3(true);});
    const startTimer3 = () => new Promise(resolve => setTimeout(resolve, 1000))
    .then(resolve => {setShowImageModal3(false); setWorkoutState(WorkoutState.RUNNING);});
    if (showImageModal1) {
      return (
        <Modal className="fade_in_number_modal" show={showImageModal1} size="sm" centered onShow={startTimer1} scrollable={false} >
          <img alt="" src={num3} width="80%" height="80%" />
        </Modal>
      );
    } else if (showImageModal2) {
      return (
        <Modal className="fade_in_number_modal" show={showImageModal2} size="sm" centered onShow={startTimer2} scrollable={false} >
            <img alt="" src={num2} width="80%" height="80%" />
        </Modal>
      );
    } else {
      return (
        <Modal className="fade_in_number_modal" show={showImageModal3} size="sm" centered onShow={startTimer3} scrollable={false} >
            <img alt="" src={num1} width="80%" height="80%" />
        </Modal>
      );
    }
  }

  return (
    <>
      {workoutState === WorkoutState.DONE && (
        <Confetti width={width} height={height} run={workoutState === WorkoutState.DONE} />
      )}
      <WorkoutFinishedDisplay
        show={workoutState === WorkoutState.DONE || workoutState === WorkoutState.STOPPED}
        completedSuccessfull={workoutState === WorkoutState.DONE}
        reset={() => setWorkoutState(WorkoutState.INITIAL)}
        quit={() => setWorkoutState(WorkoutState.PAUSED)}
      />
      <ImageModal />
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
          {props.workoutTimerControl.currentWorkoutTimerState.breakTime >= 0 &&
            props.workoutTimerControl.currentWorkoutTimerState.rounds > 1 && (
              <Row xs="1" className="mt-3 ml-3 mr-3">
                <ProgressBar
                  bsPrefix="fgl-progress"
                  animated
                  now={props.workoutTimerControl.currentWorkoutTimerState.breakTime}
                  label={`${props.workoutTimerControl.currentWorkoutTimerState.breakTime}sec`}
                  max={props.workoutTimerControl.initialWorkoutTimerState.breakTime}
                />
              </Row>
            )}
          <Row className="mt-3 justify-content-center">
            <ButtonToolbar aria-label="Toolbar with button groups">
              <Button
                id="button-fg"
                className="mr-2"
                size="lg"
                active
                onClick={runWorkout}
                disabled={
                  workoutState === WorkoutState.RUNNING ||
                  audioIsPlaying ||
                  props.workoutTimerControl.initialWorkoutTimerState.intervalTime === 0 ||
                  props.workoutTimerControl.initialWorkoutTimerState.rounds === 0
                }
              >
                {workoutState === WorkoutState.INITIAL && !audioIsPlaying ? 'Start' : 'Continue'}
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
