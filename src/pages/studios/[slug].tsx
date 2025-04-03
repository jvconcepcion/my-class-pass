import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getWixClient } from '@/lib/wixClient';
import { AvailabilityListProps, ScheduleCardProps, ServiceListProps } from '@lib/types';
import { media } from '@wix/sdk';
import { Footer, ImageCard, ScheduleCard, StudioAddressCard, Svg, TruncatedText } from '@components';
import moment from 'moment';

const wixClient = getWixClient();

const StudioPage = () => {
  const router = useRouter();
  const [service, setService] = useState<ServiceListProps | null>(null);
  const [availabilityEntries, setAvailabilityEntries] = useState<AvailabilityListProps[]>([]);
  const [imageSrc, setImageSrc] = useState<string>('');

  const { slug } = router.query;

  const fetchService = async () => {
    if (!slug) return;

    const slugString = Array.isArray(slug) ? slug[0] : slug;
    const query = wixClient.services.queryServices();

    const serviceItem = await query.eq('mainSlug.name', decodeURIComponent(slugString)).find();
    setService(serviceItem?.items?.[0] ?? null);
  };

  const fetchAvailability = async () => {
    if (!service?._id) return;

    const today = new Date();
    const oneWeek = new Date(today);
    oneWeek.setDate(oneWeek.getDate() + 7);
    const availability = await wixClient.availabilityCalendar.queryAvailability({
      filter: {
        serviceId: [service._id],
        startDate: today.toISOString(),
        endDate: oneWeek.toISOString()
      }
    }, { timezone: 'UTC' });

    setAvailabilityEntries(availability?.availabilityEntries ?? []);

    console.log('oneWeek', oneWeek);
  }

    // Group schedules by day
    const groupedEntries = availabilityEntries.reduce((acc, entry) => {
      const dayLabel = moment(entry.slot.startDate).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'dddd',
      });
  
      if (!acc[dayLabel]) acc[dayLabel] = [];
      acc[dayLabel].push(entry);
      return acc;
    }, {} as Record<string, typeof availabilityEntries>);

  useEffect(() => {
    fetchService();
  }, [slug]);

  useEffect(() => {
    if (service) fetchAvailability();
  }, [service]);

  useEffect(() => {
    if (service?.media?.mainMedia?.image) {
      setImageSrc(media.getImageUrl(service.media.mainMedia.image)?.url ?? '');
    }
  }, [service]);
  console.log(availabilityEntries)
  return (
    <>
      <main>
        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-6 md:mt-4 md:mx-40 lg:mx-48 xl:mx-96'>
          <div>
            <ImageCard
              url={imageSrc}
              width={430}
              height={290}
            />
            <div className='mx-4 sm:ml-0'>
              <div className='bg-white sticky top-16 w-full border-b border-[#e7e7e7] pt-4 z-10'>
                <span className='mb-[-1px] text-blue-950 border-b-[3px] border-blue-950'>Info</span>
              </div>
              <div className='overflow-hidden pt-6'>
                <h1 className='text-xl leading-[1.333] font-medium'>{service?.name}</h1>
                <h2 className='text-xs mt-1 text-gray-600'>{service?.tagLine}</h2>
              </div>
              <div className='py-6 text-sm border-b border-[#e7e7e7]'>
                <p className='pb-4'>
                  <TruncatedText
                    text={service?.description}
                    maxSentences={3}
                    withReadMore={true}
                  />
                </p>
              </div>
              <div className='sm:hidden py-6 border-b border-[#e7e7e7]'>
                <StudioAddressCard 
                  width={400}
                  height={140}  
                />
                <div className='flex py-2'>
                  <Svg component='address' />
                  <p className='ml-4 text-sm'>{service?.locations[0].calculatedAddress.formatted}</p>
                </div>
              </div>
              <div className='pt-6'>
                <h2 className='text-lg font-medium'>Schedule</h2>
                <div className='py-3'>
                  {Object.entries(groupedEntries).map(([day, entries]) => (
                    <div key={day} className='mb-6'>
                      <div className='text-lg font-semibold py-3'>{day}</div>
                      <div className='flex flex-col gap-y-3'>
                        {entries?.map((entry: ScheduleCardProps , i: number) => (
                          <ScheduleCard key={i} availabilityEntry={entry} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className='hidden md:block md:w-72 relative'>
            <div className='sticky top-[64px] left-0 w-full'>
              <StudioAddressCard
                data={service}
                width={380}
                height={200}  
              />
              <div className='flex py-2'>
                <Svg component='address' />
                <p className='ml-4 text-sm'>{service?.locations[0].calculatedAddress.formatted}</p>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
};

export default StudioPage;