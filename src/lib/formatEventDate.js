// src/components/formatEventDate.js
export const formatEventDate = (isoString, format = 'full') => {
  const date = new Date(isoString);
  if (!isoString || isNaN(date)) return 'Invalid Date';

  const formats = {
    full: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    },
    short: {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    },
    time: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    }
  };

  if (format === 'time') {
    return date.toLocaleTimeString('en-IN', formats[format]);
  }

  return date.toLocaleDateString('en-IN', formats[format]);
};

// Only show start time
export const formatTime = (startTime) => {
  if (!startTime || typeof startTime !== 'string') return '';

  const [startHour, startMinute] = startTime.split(":");
  const h = parseInt(startHour, 10);
  const startHour12 = h % 12 === 0 ? 12 : h % 12;
  const startAMPM = h >= 12 ? "PM" : "AM";

  return `${startHour12}:${startMinute} ${startAMPM}`;
};
