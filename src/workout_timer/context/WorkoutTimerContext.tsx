import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import WorkoutTimerState from '../props/WorkoutTimerState';

export const WorkoutTimerContext = React.createContext({
  configured: false,
  initialWorkoutTimerState: { intervalTime: -1, breakTime: -1, rounds: -1 },
  currentWorkoutTimerState: { intervalTime: -1, breakTime: -1, rounds: -1 },
  setConfigured: (configured: boolean) => {},
  setInitialWorkoutTimerState: (workoutTimerState: WorkoutTimerState) => {},
  setCurrentWorkoutTimerState: (workoutTimerState: WorkoutTimerState) => {},
});

function getInitialValues(search: string): [boolean, WorkoutTimerState, WorkoutTimerState] {
  const searchParams = new URLSearchParams(search);
  const configured = searchParams.get('configured') === "true" ? true : false;
  const initialWorkoutTimerState: WorkoutTimerState = {
    intervalTime: parseInt(searchParams.get('interval') || '-1') || -1,
    breakTime: parseInt(searchParams.get('break') || '-1') || -1,
    rounds: parseInt(searchParams.get('rounds') || '-1') || -1,
  };
  const currentWorkoutTimerState: WorkoutTimerState = {
    intervalTime: parseInt(searchParams.get('currentInterval') || '0') || 0,
    breakTime: parseInt(searchParams.get('currentBreak') || '0') || 0,
    rounds: parseInt(searchParams.get('currentRounds') || '0') || 0,
  };
  return [configured, initialWorkoutTimerState, currentWorkoutTimerState];
}

export const WorkoutTimerContextProvider: React.FC = props => {
  const history = useHistory();
  const location = useLocation();

  const initialValues: [boolean, WorkoutTimerState, WorkoutTimerState] = (() => getInitialValues(location.search))();

  const [configured, setConfigured] = useState<boolean>(initialValues[0]);
  const [initialWorkoutTimerState, setInitialWorkoutTimerState] = useState<WorkoutTimerState>(initialValues[1]);
  const [currentWorkoutTimerState, setCurrentWorkoutTimerState] = useState<WorkoutTimerState>(initialValues[2]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set('configured', `${configured}`);
    searchParams.set('interval', `${initialWorkoutTimerState.intervalTime}`);
    searchParams.set('break', `${initialWorkoutTimerState.breakTime}`);
    searchParams.set('rounds', `${initialWorkoutTimerState.rounds}`);
    searchParams.set('currentInterval', `${currentWorkoutTimerState.intervalTime}`);
    searchParams.set('currentBreak', `${currentWorkoutTimerState.breakTime}`);
    searchParams.set('currentRounds', `${currentWorkoutTimerState.rounds}`);

    history.push(`?${searchParams.toString()}`);
  }, [configured, initialWorkoutTimerState, currentWorkoutTimerState, history, location.search]);

  return (
    <WorkoutTimerContext.Provider
      value={{
        configured: configured,
        initialWorkoutTimerState: initialWorkoutTimerState,
        currentWorkoutTimerState: currentWorkoutTimerState,
        setConfigured: setConfigured,
        setInitialWorkoutTimerState: setInitialWorkoutTimerState,
        setCurrentWorkoutTimerState: setCurrentWorkoutTimerState,
      }}
    >
      {props.children}
    </WorkoutTimerContext.Provider>
  );
};
