export function secondsToTime(seconds: number) {
    var hours = seconds / 3600 % 24;
    var minutes = seconds / 60 % 60;
    var seconds = seconds % 60;

    return {
        seconds,
        minutes,
        hours
    };
};