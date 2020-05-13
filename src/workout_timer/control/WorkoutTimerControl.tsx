import { useState, useEffect, useContext } from 'react';
import WorkoutTimerProps from '../props/WorkoutTimerProps';
import { WorkoutTimerContext } from '../context/WorkoutTimerContext';

function useWorkoutTimerControl(): WorkoutTimerProps {
  const { initialWorkoutTimerState, currentWorkoutTimerState, setCurrentWorkoutTimerState } = useContext(
    WorkoutTimerContext,
  );
  const [countDown, setCountDown] = useState(false);
  const [done, setDone] = useState(false);
  const audioBeforeBreakSource: string = require('../../sounds/beforeBreak.mp3');
  const audioBeforeIntervalSource: string = require('../../sounds/beforeInterval.wav');
  const audioBeforeBreak: HTMLAudioElement = new Audio();
  const audioBeforeInterval: HTMLAudioElement = new Audio();

  const initializePlayAudio = () => {
    audioBeforeBreak.play();
    audioBeforeInterval.play();
  };

  const resetWorkout = () => {
    setCountDown(false);
    setDone(false);
    setCurrentWorkoutTimerState(initialWorkoutTimerState);
  };
  
  useEffect(() => {
    const tick = () => {
      if (countDown) {
        if (currentWorkoutTimerState.rounds > 0 && currentWorkoutTimerState.intervalTime > 0) {
          if (currentWorkoutTimerState.intervalTime === 1) {
            audioBeforeBreak.src = audioBeforeBreakSource;
            audioBeforeBreak.volume = 0.5;
            audioBeforeBreak.defaultMuted = false;
            audioBeforeBreak.muted = false;
            audioBeforeBreak.play();
          }
          setCurrentWorkoutTimerState({
            intervalTime: currentWorkoutTimerState.intervalTime - 1,
            breakTime: currentWorkoutTimerState.breakTime,
            rounds: currentWorkoutTimerState.rounds,
          });
        } else if (currentWorkoutTimerState.rounds > 1 && currentWorkoutTimerState.breakTime > 0) {
          if (currentWorkoutTimerState.breakTime === 1) {
            audioBeforeInterval.src = audioBeforeIntervalSource;
            audioBeforeInterval.defaultMuted = false;
            audioBeforeInterval.muted = false;
            audioBeforeInterval.play();
          }
          setCurrentWorkoutTimerState({
            intervalTime: currentWorkoutTimerState.intervalTime,
            breakTime: currentWorkoutTimerState.breakTime - 1,
            rounds: currentWorkoutTimerState.rounds,
          });
        } else if (currentWorkoutTimerState.rounds > 0) {
          if (currentWorkoutTimerState.rounds === 1) {
            setCurrentWorkoutTimerState({
              intervalTime: currentWorkoutTimerState.intervalTime,
              breakTime: currentWorkoutTimerState.breakTime,
              rounds: currentWorkoutTimerState.rounds - 1,
            });
          } else {
            setCurrentWorkoutTimerState({
              intervalTime: initialWorkoutTimerState.intervalTime,
              breakTime: initialWorkoutTimerState.breakTime,
              rounds: currentWorkoutTimerState.rounds - 1,
            });
          }
        }
      }
    };
    if (countDown && currentWorkoutTimerState.rounds === 0) {
      setCountDown(false);
      setDone(true);
    } else {
      setTimeout(tick, 1000);
    }
  }, [
    countDown,
    currentWorkoutTimerState,
    initialWorkoutTimerState,
    // audioBeforeBreak,
    // audioBeforeInterval,
    setCurrentWorkoutTimerState,
  ]);

  return {
    setCountDown: setCountDown,
    initializePlayAudio: initializePlayAudio,
    resetWorkout: resetWorkout,
    done: done,
  };
}

export default useWorkoutTimerControl;
