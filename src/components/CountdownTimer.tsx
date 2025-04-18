import { useState, useEffect } from 'react';
import moment from 'moment';

const CountdownTimer: React.FC = () => {
  // Set target date (you can change the time too, like '2025-05-15T23:59:59')
  const targetDate = moment('2025-05-15T23:59:59');
  const [timeLeft, setTimeLeft] = useState(targetDate.diff(moment()));
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const remaining = targetDate.diff(now);

      // Check if today is May 15
      if (now.isSame(targetDate, 'day')) {
        setIsToday(true);
        clearInterval(interval);
        return;
      }

      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Convert to duration and format properly
  const duration = moment.duration(timeLeft);
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return (
    <div className='bg-[#e6f3ff] text-[#05f] font-semibold px-1 py-2 rounded-[5px]'>
      {isToday
        ? '00d 00h 00m 00s'
        : `${duration.days()}d ${hours}h ${minutes}m ${seconds}s`}
    </div>
  );
};

export default CountdownTimer;
