import { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const targetTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
  const [timeLeft, setTimeLeft] = useState(targetTime - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remaining = targetTime - now;
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  // Convert timeLeft into hours, minutes, and seconds
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className='bg-[#e6f3ff] text-[#05f] font-semibold px-1 py-2 rounded-[5px]'>
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

export default CountdownTimer;
