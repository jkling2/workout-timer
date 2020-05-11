import { useState, useEffect } from 'react';
import WorkoutTimerProps from '../props/WorkoutTimerProps';
import WorkoutTimerState from '../props/WorkoutTimerState';

function useWorkoutTimerControl(): WorkoutTimerProps {
  const [initialWorkoutTimerState, setInitialWorkoutTimerState] = useState<WorkoutTimerState>({
    intervalTime: 0,
    breakTime: 0,
    rounds: 0,
  });
  const [currentWorkoutTimerState, setCurrentWorkoutTimerState] = useState<WorkoutTimerState>(initialWorkoutTimerState);
  const [countDown, setCountDown] = useState(false);
  const [done, setDone] = useState(false);
  const audioBeforeBreak: string = require('../../sounds/beforeBreak.mp3');
  const audioBeforeInterval: string = require('../../sounds/beforeInterval.wav');
  const intervalAudio: HTMLAudioElement = new Audio();

  const initializePlayAudio = () => {
    intervalAudio.play();
  };

  const resetWorkout = () => {
    setCountDown(false);
    setDone(false);
    setCurrentWorkoutTimerState(initialWorkoutTimerState);
  };

  useEffect(() => {
    setCurrentWorkoutTimerState(initialWorkoutTimerState);
  }, [initialWorkoutTimerState]);

  useEffect(() => {
    const playAudio = (source: string) => {
      intervalAudio.src = source;
      if (source === audioBeforeInterval) {
        intervalAudio.volume = 0.5;
      }
      intervalAudio.muted = false;
      intervalAudio.play();
    };

    const tick = () => {
      if (countDown) {
        if (currentWorkoutTimerState.rounds > 0 && currentWorkoutTimerState.intervalTime > 0) {
          if (currentWorkoutTimerState.intervalTime === 1) {
            playAudio(audioBeforeBreak);
          }
          setCurrentWorkoutTimerState({
            intervalTime: currentWorkoutTimerState.intervalTime - 1,
            breakTime: currentWorkoutTimerState.breakTime,
            rounds: currentWorkoutTimerState.rounds,
          });
        } else if (currentWorkoutTimerState.rounds > 1 && currentWorkoutTimerState.breakTime > 0) {
          if (currentWorkoutTimerState.breakTime === 1) {
            playAudio(audioBeforeInterval);
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
    audioBeforeBreak,
    audioBeforeInterval,
    intervalAudio,
  ]);

  return {
    initialWorkoutTimerState: initialWorkoutTimerState,
    setInitialWorkoutTimerState: setInitialWorkoutTimerState,
    currentWorkoutTimerState: currentWorkoutTimerState,
    setCountDown: setCountDown,
    initializePlayAudio: initializePlayAudio,
    resetWorkout: resetWorkout,
    done: done,
  };
}

export default useWorkoutTimerControl;
