import React from 'react';

function paddedNumber(number: number, spaces = 2) {
    const strNumber = String(Math.floor(number));
    const zeros = spaces - strNumber.length;
    return '0'.repeat(zeros >= 0 ? zeros : 0) + strNumber;
}

export function Time({ time }: { time: number }) {
    const minutes = paddedNumber(time / (1000 * 60));
    const seconds = paddedNumber((time / 1000) % 60);
    const millis = paddedNumber(time % 100);

    return <>{`${minutes}:${seconds}:${millis}`}</>;
}
