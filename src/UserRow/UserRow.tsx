import React, { useReducer, useEffect } from 'react';
import { Time } from './Time';

export function UserRow({
    userName,
    timerStart,
    totalTimer,
    startTimer,
    stopTimer,
}: {
    userName: string;
    timerStart: number | null;
    totalTimer: number;
    startTimer: () => void;
    stopTimer: () => void;
}) {
    const [, forceUpdate] = useReducer((x) => (x + 1) % 50, 0);

    useEffect(() => {
        if (timerStart) {
            console.log('effect');
            const interval = setInterval(() => forceUpdate(), 103);
            return () => clearInterval(interval);
        }
    }, [timerStart]);

    return (
        <div className='row'>
            <div className='userName'>{userName}</div>
            <div className='timer'>
                {timerStart ? (
                    <Time time={totalTimer + (Date.now() - timerStart)} />
                ) : (
                    <Time time={totalTimer} />
                )}
            </div>
            <div className='buttons'>
                {timerStart ? (
                    <button
                        className='actionButton stopButton'
                        onClick={() => {
                            stopTimer();
                        }}
                    >
                        Stop
                    </button>
                ) : (
                    <button
                        className='actionButton startButton'
                        onClick={() => {
                            startTimer();
                        }}
                    >
                        Start
                    </button>
                )}
            </div>
        </div>
    );
}
