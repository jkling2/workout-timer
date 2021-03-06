import React, { useState, useEffect, useContext } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import { Card, Row, ProgressBar, ButtonToolbar, Button } from 'react-bootstrap';
import Confetti from 'react-confetti';
import WorkoutTimerProps from '../props/WorkoutTimerProps';
import WorkoutFinishedDisplay from './WorkoutFinishedDisplay';
import WorkoutStartDisplay from './WorkoutStartDisplay';
import { WorkoutTimerContext } from '../context/WorkoutTimerContext';

enum WorkoutState {
  INITIAL,
  RUNNING,
  PAUSED,
  STOPPED,
  DONE,
}

const WorkoutTimer: React.FC<{ workoutTimerControl: WorkoutTimerProps }> = props => {
  const { width, height } = useWindowSize();
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);
  const { initialWorkoutTimerState, currentWorkoutTimerState } = useContext(WorkoutTimerContext);

  const initialState =
    currentWorkoutTimerState.intervalTime === initialWorkoutTimerState.intervalTime &&
    currentWorkoutTimerState.breakTime === initialWorkoutTimerState.breakTime &&
    currentWorkoutTimerState.rounds === initialWorkoutTimerState.rounds
      ? WorkoutState.INITIAL
      : WorkoutState.PAUSED;
  const [workoutState, setWorkoutState] = useState(initialState);

  const audioBeforeStart = new Audio(require('../../sounds/beforeStart321.wav'));
  audioBeforeStart.addEventListener('ended', () => {
    setAudioIsPlaying(false);
    setWorkoutState(WorkoutState.RUNNING);
  });
  audioBeforeStart.addEventListener('playing', () => {
    setAudioIsPlaying(true);
  });

  const runWorkout = () => {
    if (workoutState === WorkoutState.INITIAL) {
      audioBeforeStart.play();
      props.workoutTimerControl.initializePlayAudio();
    } else {
      setWorkoutState(WorkoutState.RUNNING);
    }
  };

  useEffect(() => {
    if (props.workoutTimerControl.done) {
      setWorkoutState(WorkoutState.DONE);
    }
  }, [props.workoutTimerControl.done]);

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
  }, [workoutState, props.workoutTimerControl]);

  return (
    <>
      {workoutState === WorkoutState.DONE && (
        <Confetti width={width} height={height} run={workoutState === WorkoutState.DONE} />
      )}
      <WorkoutStartDisplay start={audioIsPlaying} />
      <WorkoutFinishedDisplay
        show={workoutState === WorkoutState.DONE || workoutState === WorkoutState.STOPPED}
        completedSuccessfull={workoutState === WorkoutState.DONE}
        reset={() => setWorkoutState(WorkoutState.INITIAL)}
        quit={() => setWorkoutState(WorkoutState.PAUSED)}
      />
      <Card id="card-fg">
        <Card.Body>
          <Card.Title id="card-title-fg">Workout</Card.Title>
          <Card.Text className="mt-3 ml-3 mr-3">
            {initialWorkoutTimerState.intervalTime} sec PUSH -&nbsp;
            {Math.max(0, initialWorkoutTimerState.breakTime)} sec REST -&nbsp;
            {initialWorkoutTimerState.rounds} times
          </Card.Text>
          <Card.Text className="mt-3 ml-3 mr-3">
            {initialWorkoutTimerState.rounds - currentWorkoutTimerState.rounds}/{initialWorkoutTimerState.rounds} Rounds
          </Card.Text>
          <Row xs="1" className="mt-3 ml-3 mr-3">
            <ProgressBar
              bsPrefix="fg-progress"
              animated
              now={currentWorkoutTimerState.intervalTime}
              label={`${currentWorkoutTimerState.intervalTime}sec`}
              max={initialWorkoutTimerState.intervalTime}
            />
          </Row>
          {currentWorkoutTimerState.breakTime >= 0 && currentWorkoutTimerState.rounds > 1 && (
            <Row xs="1" className="mt-3 ml-3 mr-3">
              <ProgressBar
                bsPrefix="fgl-progress"
                animated
                now={currentWorkoutTimerState.breakTime}
                label={`${currentWorkoutTimerState.breakTime}sec`}
                max={initialWorkoutTimerState.breakTime}
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
                  initialWorkoutTimerState.intervalTime === 0 ||
                  initialWorkoutTimerState.rounds === 0
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

export default WorkoutTimer;
