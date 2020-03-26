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
  let audioBeforeBreak = new Audio("/sounds/beforeBreak.mp3")
  let audioBeforeInterval = new Audio("/sounds/beforeInterval.wav")

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

  
  // useEffect(() => {

    // async function do_stuff() {
    //     function sleep(ms: number) {
    //         const sleepPromise =  new Promise( resolve => setTimeout(resolve, ms) );
    //         return sleepPromise;
    //       }
    //       if (countDown) {
    //         console.log("start");
    //       for (var k = rounds; k > 0; k--) {
    //         console.log(k);
    //         for (var i = intervalTime; i > 0; i--) {
    //             console.log("iT" + i);
    //           // sleep(1000).then(resolve => setIntervalTime(intervalTime - 1));
    //           await sleep(1000);
    //             setIntervalTime(intervalTime - i);
    
    //         }
    //         for (var j = breakTime; j > 0; j--) {
    //             console.log("bT" + j);
    //         //  sleep(1000).then(resolve => setBreakTime(breakTime - 1));
    //         await sleep(1000);
    //         setBreakTime(breakTime - j);
    
    //         }
    //         setIntervalTime(initialIntervalTime);
    //         setBreakTime(initialBreakTime);
    //       }
    //     }

    //   }
    // do_stuff();
    // }, [countDown]);
    

//     if (countDown && rounds > 0 && intervalTime > 0) {
//       sleep(1000).then(resolve => setIntervalTime(intervalTime - 1));
//     } else if (countDown && rounds > 0 && breakTime > 0) {
//       sleep(1000).then(resolve => setBreakTime(breakTime - 1));
//     } else if (countDown && rounds > 0) {
//       setRounds(rounds - 1);
//       setIntervalTime(initialIntervalTime);
//       setBreakTime(initialBreakTime);
//     }
//   }, [countDown, intervalTime, breakTime, rounds]);


  return {
    initialWorkoutTimerState: initialWorkoutTimerState, 
    setInitialWorkoutTimerState: setInitialWorkoutTimerState,
    currentWorkoutTimerState: currentWorkoutTimerState, 
    setCountDown: setCountDown,
  };
}

export default useWorkoutTimerControl;
