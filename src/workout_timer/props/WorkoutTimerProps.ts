import WorkoutTimerState from "./WorkoutTimerState";

interface WorkoutTimerProps {
    setCountDown: Function;
    initializePlayAudio: Function;
    resetWorkout: Function;
    done:boolean;
}

export default WorkoutTimerProps;