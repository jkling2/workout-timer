import React, { useState, useContext } from 'react';
import { Card, InputGroup, Col, Form, Row, Button } from 'react-bootstrap';
import { WorkoutTimerContext } from '../context/WorkoutTimerContext';
import WorkoutTimerState from '../props/WorkoutTimerState';

interface WorkoutConfigurationProps {
  setCountDown: Function;
}

const WorkoutConfiguration: React.FC<WorkoutConfigurationProps> = props => {
  const {
    initialWorkoutTimerState,
    setInitialWorkoutTimerState,
    setCurrentWorkoutTimerState,
    configured,
    setConfigured,
  } = useContext(WorkoutTimerContext);
  const [intervalTime, setIntervalTime] = useState(initialWorkoutTimerState.intervalTime);
  const [breakTime, setBreakTime] = useState(initialWorkoutTimerState.breakTime);
  const [rounds, setRounds] = useState(initialWorkoutTimerState.rounds);
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
            value={intervalTime < 0 ? "" : intervalTime}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              if (isNaN(parseInt(event.currentTarget.value)) || event.currentTarget.value.length === 0) {
                setIntervalTime(-1);
              } else {
                setIntervalTime(parseInt(event.currentTarget.value));
              }
            }}
            disabled={configured}
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
            value={breakTime < 0 ? "" : breakTime}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              if (isNaN(parseInt(event.currentTarget.value)) || event.currentTarget.value.length === 0) {
                setBreakTime(-1);
              } else {
                setBreakTime(parseInt(event.currentTarget.value));
              }
            }}
            disabled={configured}
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
            value={rounds < 0 ? "" : rounds}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              if (isNaN(parseInt(event.currentTarget.value)) || event.currentTarget.value.length === 0) {
                setRounds(-1);
              } else {
                setRounds(parseInt(event.currentTarget.value));
              }
            }}
            disabled={configured}
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
                setConfigured(true);
                const newInitialWorkoutTimerState: WorkoutTimerState = {
                  intervalTime: intervalTime,
                  breakTime: breakTime === 0 ? -1 : breakTime,
                  rounds: rounds,
                };
                setInitialWorkoutTimerState(newInitialWorkoutTimerState);
                setCurrentWorkoutTimerState(newInitialWorkoutTimerState);
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
            disabled={configured}
          >
            Submit
          </Button>
          <Button
            id="button-fg"
            className="ml-2"
            onClick={() => {
              setConfigured(false);
              props.setCountDown(false);
            }}
            disabled={!configured}
          >
            Configure
          </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default WorkoutConfiguration;
