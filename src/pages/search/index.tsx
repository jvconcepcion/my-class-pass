import { useEffect, useState, useContext } from 'react';
import { getWixClient } from '@lib/wixClient';
import { ServiceCard, Map } from '@components';
import { ServiceListProps } from '@lib/types';
import { SearchContext, MenuContext } from '@lib/context';

const wixClient = getWixClient();
const Search: React.FC = () => {
  const [serviceList, setServiceList] = useState<ServiceListProps[]>([]);
  const menuContext = useContext(MenuContext);
  const searchContext = useContext(SearchContext);

  if (!menuContext) {
    throw new Error('MenuContext is missing in the component tree');
  }

  if (!searchContext) {
    throw new Error('SearchContext is missing in the component tree');
  }

  const { isMenuOpen } = menuContext;
  const { searchTerm } = searchContext;

  const fetchServices = async () => {
    try {
      const query = wixClient.services.queryServices();
      const serviceData = searchTerm
        ? await query.startsWith('name', decodeURIComponent(searchTerm)).find()
        : await query.find();
      setServiceList(serviceData?.items ?? []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [searchTerm]);

  return (
    <>
      <main className='flex flex-col h-screen'>
        {/* Navbar or Header */}
        <div className='w-full h-16 shadow-lg flex-shrink-0'></div>

        {/* Main Content Area */}
        <div className='flex flex-grow w-full bg-white/50'>
          {isMenuOpen ? (
            <section className='w-full md:w-1/2 overflow-y-auto p-4'>
              <h1 className='text-sm font-medium leading-none pt-4'>All Categories</h1>
              <ul className='mt-4 space-y-4'>
                {serviceList.map((service, i) => (
                  <li key={i} className='p-4 border-b'>
                    <ServiceCard service={service} />
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section className='w-full md:hidden'>
              <Map data={serviceList.map(({ locations }) => locations[0]?.calculatedAddress)} />
            </section>
          )}

          <div className='hidden md:block w-1/2 h-full'>
            <Map className='rounded' data={serviceList.map(({ locations }) => locations[0]?.calculatedAddress)} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Search