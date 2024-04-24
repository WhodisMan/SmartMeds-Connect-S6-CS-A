import React from 'react';
import './Calendar.css';  // Import the associated CSS file for styling

const Calendar = ({ medicationCalendar }) => {
  const renderCalendarDays = () => {
    if (!medicationCalendar || medicationCalendar.length === 0) {
      return <p>No medication data available</p>;
    }

    const { start_date, missed_dates, correct_dates } = medicationCalendar;
    const startDate = new Date(start_date);
    const missedDateSet = new Set(missed_dates.map((date) => new Date(date)));
    const correctDateSet = new Set(correct_dates.map((date) => new Date(date)));

    const numberOfDays = 30;
    const calendarDays = [];

    for (let i = 0; i < numberOfDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      calendarDays.push(
        <div key={i} className={getDayClassName(currentDate, missedDateSet, correctDateSet)}>
          {currentDate.toISOString().split('T')[0]}
        </div>
      );
    }

    return calendarDays;
  };

  const getDayClassName = (date, missedDateSet, correctDateSet) => {
    const isoDate = date.toISOString().split('T')[0];

    if (missedDateSet.has(isoDate)) {
      return 'calendar-day missed-day';
    } else if (correctDateSet.has(isoDate)) {
      return 'calendar-day correct-day';
    } else {
      return 'calendar-day default-day';
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">Medication Calendar</div>
      <div className="calendar-days">{renderCalendarDays()}</div>
    </div>
  );
};

export default Calendar;
