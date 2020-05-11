import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import num3 from '../../img/3.svg';
import num2 from '../../img/2.svg';
import num1 from '../../img/1.svg';

const WorkoutStartDisplay: React.FC<{ start: boolean }> = props => {
  const [showImageModal3, setShowImageModal3] = useState(false);
  const [showImageModal2, setShowImageModal2] = useState(false);
  const [showImageModal1, setShowImageModal1] = useState(false);
  const startTimer3 = () =>
    new Promise(resolve => setTimeout(resolve, 1000)).then(resolve => {
      setShowImageModal3(false);
      setShowImageModal2(true);
    });
  const startTimer2 = () =>
    new Promise(resolve => setTimeout(resolve, 1000)).then(resolve => {
      setShowImageModal2(false);
      setShowImageModal1(true);
    });
  const startTimer1 = () =>
    new Promise(resolve => setTimeout(resolve, 1000)).then(resolve => {
      setShowImageModal1(false);
    });

  useEffect(() => {
    if (props.start) {
      setShowImageModal3(true);
    }
  }, [props.start]);

  if (showImageModal3) {
    return (
      <Modal
        className="fade_in_number_modal"
        show={showImageModal3}
        size="sm"
        centered
        onShow={startTimer3}
        scrollable={false}
      >
        <img alt="" src={num3} width="80%" height="80%" />
      </Modal>
    );
  } else if (showImageModal2) {
    return (
      <Modal
        className="fade_in_number_modal"
        show={showImageModal2}
        size="sm"
        centered
        onShow={startTimer2}
        scrollable={false}
      >
        <img alt="" src={num2} width="80%" height="80%" />
      </Modal>
    );
  } else if (showImageModal1) {
    return (
      <Modal
        className="fade_in_number_modal"
        show={showImageModal1}
        size="sm"
        centered
        onShow={startTimer1}
        scrollable={false}
      >
        <img alt="" src={num1} width="80%" height="80%" />
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default WorkoutStartDisplay;
