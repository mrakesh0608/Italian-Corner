export const time = {
    min: 60,
    hour: 60 * 60,
    day: 60 * 60 * 24,
    month: 60 * 60 * 24 * 30,
    year: 60 * 60 * 24 * 30 * 12
}

export const timeHourMin = (time) => {

    time = new Date(time)
    return time.toLocaleString('en-IN', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    })
}
export const timeHourMinSec = (time) => {

    time = new Date(time)
    return time.toLocaleString('en-IN', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    })
}
export const getDate = (time) => {
    return (new Date(time)).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'Asia/Kolkata'
    });
}

export const todayDate = () => {
    return (new Date()).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

export const timer = ({ time, limit }) => {

    time = new Date(time)

    // To calculate the time difference of two dates
    const Diff_In_Time = new Date().getTime() - time.getTime();

    // To calculate the no. of sec between two dates
    const Diff_In_secs = Diff_In_Time / (1000);

    let secs = limit - Math.round(Diff_In_secs)
    return (secs <= 0 ? '' : secs).toString();
}