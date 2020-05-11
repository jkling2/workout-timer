import React, { useState } from 'react';
import { Card, InputGroup, Col, Form, Row, Button } from 'react-bootstrap';
import WorkoutTimerProps from '../props/WorkoutTimerProps';

interface WorkoutConfigurationProps {
  workoutTimerControl: WorkoutTimerProps;
  configured: boolean;
  setConfigured: Function;
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

export default WorkoutConfiguration;
