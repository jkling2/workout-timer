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
  const [done, setDone] = useState(false);
  let audioBeforeBreak = "https://raw.githubusercontent.com/jkling2/workout-timer/master/public/sounds/beforeBreak.mp3";
  let audioBeforeInterval = "https://raw.githubusercontent.com/jkling2/workout-timer/master/public/sounds/beforeInterval.wav";
  let intervalAudio:HTMLAudioElement = new Audio();

  const setAudio = (audio: HTMLAudioElement) => {
    intervalAudio = audio;
  }
  
  const resetWorkout = () => {
    setCountDown(false);
    setDone(false);
    setCurrentWorkoutTimerState(initialWorkoutTimerState);
  }
  
  useEffect(() => {
    setCurrentWorkoutTimerState(initialWorkoutTimerState);
  }, [initialWorkoutTimerState]);
  
  useEffect(() => {
    const playAudio = (source: string) => {
      intervalAudio.src = source;
      if (source === audioBeforeInterval) {
        intervalAudio.volume = 0.5;
      }
      return intervalAudio.play();
    }
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
    } else if (countDown && currentWorkoutTimerState.rounds > 1 && currentWorkoutTimerState.breakTime > 0) {
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
      .then(resolve => {
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
    });
    } else if (countDown && currentWorkoutTimerState.rounds === 0) {
        setCountDown(false);
        setDone(true);
    }
  }, [countDown, currentWorkoutTimerState, initialWorkoutTimerState, audioBeforeBreak, audioBeforeInterval, intervalAudio]);

  return {
    initialWorkoutTimerState: initialWorkoutTimerState, 
    setInitialWorkoutTimerState: setInitialWorkoutTimerState,
    currentWorkoutTimerState: currentWorkoutTimerState, 
    setCountDown: setCountDown,
    setAudio: setAudio,
    resetWorkout: resetWorkout,
    done: done,
  };
}

export default useWorkoutTimerControl;
