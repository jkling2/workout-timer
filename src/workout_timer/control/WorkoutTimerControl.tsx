import { useState, useEffect } from 'react';
import WorkoutTimerProps from '../props/WorkoutTimerProps';
import WorkoutTimerState from '../props/WorkoutTimerState';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function useWorkoutTimerControl(): WorkoutTimerProps {
  const [initialWorkoutTimerState, setInitialWorkoutTimerState] = useState<WorkoutTimerState>({ intervalTime: 0, breakTime: 0, rounds: 0});
  const [currentWorkoutTimerState, setCurrentWorkoutTimerState] = useState<WorkoutTimerState>(initialWorkoutTimerState);
  const [countDown, setCountDown] = useState(false);
  let audioBeforeBreak = new Audio("https://raw.githubusercontent.com/jkling2/workout-timer/master/public/sounds/beforeBreak.mp3")
  let audioBeforeInterval = new Audio("https://raw.githubusercontent.com/jkling2/workout-timer/master/public/sounds/beforeInterval.wav")

  const playAudio = (audio: HTMLAudioElement) => {
    return audio.play();
  }

  useEffect(() => {
    setCurrentWorkoutTimerState(initialWorkoutTimerState);
  }, [initialWorkoutTimerState]);

  useEffect(() => {
    if (countDown && currentWorkoutTimerState.rounds > 0 && currentWorkoutTimerState.intervalTime > 0) {
      sleep(1000)
      .then(resolve => {
        if (currentWorkoutTimerState.intervalTime === 1) {
          return playAudio(audioBeforeBreak);
        }
      })
      .then(resolve =>
        setCurrentWorkoutTimerState({
          intervalTime: currentWorkoutTimerState.intervalTime - 1,
          breakTime: currentWorkoutTimerState.breakTime,
          rounds: currentWorkoutTimerState.rounds,
        }),
      );
    } else if (countDown && currentWorkoutTimerState.rounds > 0 && currentWorkoutTimerState.breakTime > 0) {
      sleep(1000)
      .then(resolve => {
        if (currentWorkoutTimerState.breakTime === 1) {
          return playAudio(audioBeforeInterval);
        }
      })
      .then(resolve =>
        setCurrentWorkoutTimerState({
          intervalTime: currentWorkoutTimerState.intervalTime,
          breakTime: currentWorkoutTimerState.breakTime - 1,
          rounds: currentWorkoutTimerState.rounds,
        }),
      );
    } else if (countDown && currentWorkoutTimerState.rounds > 0) {
      sleep(1000)
      .then(resolve =>
        setCurrentWorkoutTimerState({
          intervalTime: initialWorkoutTimerState.intervalTime,
          breakTime: initialWorkoutTimerState.breakTime,
          rounds: currentWorkoutTimerState.rounds - 1,
        }),
      );
    }
  }, [countDown, currentWorkoutTimerState, initialWorkoutTimerState, audioBeforeBreak, audioBeforeInterval]);

  return {
    initialWorkoutTimerState: initialWorkoutTimerState, 
    setInitialWorkoutTimerState: setInitialWorkoutTimerState,
    currentWorkoutTimerState: currentWorkoutTimerState, 
    setCountDown: setCountDown,
  };
}

export default useWorkoutTimerControl;
