import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

interface WorkoutFinishedProps {
  show: boolean;
  completedSuccessfull: boolean;
  reset: Function;
  quit: Function;
}

const WorkoutFinishedDisplay: React.FC<WorkoutFinishedProps> = props => {
  return (
    <Modal show={props.show} size="lg" centered>
      <Modal.Header className="modal-head-fg">
        <Modal.Title id="contained-modal-title-vcenter">
          {props.completedSuccessfull ? 'WUHUUUUU!' : 'Stop Workout?'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-rest-fg">
        <h5>
          {props.completedSuccessfull
            ? 'You completed your Workout! Congrats!'
            : 'Do you really want to stop your Workout?'}
        </h5>
      </Modal.Body>
      <Modal.Footer className="modal-rest-fg">
        <Button hidden={props.completedSuccessfull} id="button-fg" onClick={() => props.quit()}>
          Continue Workout
        </Button>
        <OverlayTrigger
          trigger="click"
          placement="top"
          overlay={<Tooltip id="resetTooltip">Reseting the Workout</Tooltip>}
        >
          <Button
            id="button-fg"
            onClick={() => new Promise(resolve => setTimeout(resolve, 1000)).then(resolve => props.reset())}
          >
            {props.completedSuccessfull ? 'Close' : 'Stop Workout'}
          </Button>
        </OverlayTrigger>
      </Modal.Footer>
    </Modal>
  );
};

export default WorkoutFinishedDisplay;
