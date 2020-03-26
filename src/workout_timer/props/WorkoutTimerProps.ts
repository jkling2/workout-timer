import WorkoutTimerState from "./WorkoutTimerState";

interface WorkoutTimerProps {
    initialWorkoutTimerState: WorkoutTimerState;
    setInitialWorkoutTimerState: Function;
    currentWorkoutTimerState: WorkoutTimerState;
    setCountDown: Function
}

export default WorkoutTimerProps;