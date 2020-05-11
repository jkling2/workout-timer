import WorkoutTimerState from "./WorkoutTimerState";

interface WorkoutTimerProps {
    initialWorkoutTimerState: WorkoutTimerState;
    setInitialWorkoutTimerState: Function;
    currentWorkoutTimerState: WorkoutTimerState;
    setCountDown: Function;
    setAudio: Function;
    resetWorkout: Function;
    done:boolean;
}

export default WorkoutTimerProps;