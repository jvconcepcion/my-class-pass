import { useState, useEffect } from 'react';
import { ScheduleCardProps, SlotAvailability } from '@lib/types';
import { getWixClient } from '@lib/wixClient';
import moment from 'moment';

const wixClient = getWixClient();

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  availabilityEntry
}) => { 
  const now = moment();
  const startDate = moment(availabilityEntry.slot.startDate); 
  const startDay = startDate.format('ddd MM YY'); // Day, Month, Year
  const startTime = startDate.format('ddd h:mm A');  // Time with AM/PM
  // Calculate remaining time
  const duration = moment.duration(startDate.diff(now));

  // Convert to hours and minutes
  const hours = Math.floor(duration.asHours()); 
  const minutes = duration.minutes();
  // Format remaining time conditionally
  let remainingTime = "";
  if (hours > 0) {
    remainingTime = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  } else {
    remainingTime = `${minutes}m`;
  };
  
  // Prevent negative time display
  if (duration.asMilliseconds() <= 0) {
    remainingTime = "Time passed";
  };

  const createRedirect = async (slotAvailability: SlotAvailability) => {
    const redirect = await wixClient.redirects.createRedirectSession({
      bookingsCheckout: { slotAvailability, timezone: 'UTC' },
      callbacks: { postFlowUrl: window.location.href }
    });
    window.location.href = redirect.redirectSession?.fullUrl ?? '/fallback-url';
  };

  console.log(availabilityEntry)
  return (
    <ul className='flex items-center justify-between py-3 border-b border-[#e7e7e7] w-full text-sm'>
      <li className='flex flex-col'>
        <span>{startTime}</span>
        <span className='text-[#555]'>{remainingTime}</span>
      </li>
      <li>{availabilityEntry?.slot.resource.name}</li>
      <li>
        <button 
          className='text-[#05f] rounded-sm border border-[#05f] px-2 py-1'
          onClick={() => createRedirect(availabilityEntry)}
        >Submit</button>
      </li>
    </ul>
  )
}

export default ScheduleCard;