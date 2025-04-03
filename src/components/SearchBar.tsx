import { useContext } from 'react';
import { SearchContext } from '@lib/context';
import Svg from './Svg';

const SearchBar: React.FC = () => {
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error("SearchContext is missing in the component tree");
  }

  const { searchTerm, setSearchTerm } = searchContext;
  return (
    <div className='flex flex-1 flex-nowrap h-[40px] relative w-full border border-[#d6d6d6] rounded-[20px] shadow-sm'>
      <div className='flex flex-1 text-sm leading-[1.4285714286]'>
        <div className='mb-0 flex items-center flex-1 h-10 p-2 relative transition-[flex-grow] duration-200 ease-in'>
          <div className=''>
            <span>
              <Svg component='magnifier' />
            </span>
          </div>
          <div>
            <input
              placeholder='Yoga, pilates, massage...'
              className='bg-transparent border-0 outline-none pl-2 truncate w-full'
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
        </div>
        <div className='mb-0 hidden sm:flex items-center flex-1 h-10 p-2 relative transition-[flex-grow] duration-200 ease-in before-custom-divider'>
          <div className=''>
            <span>
              <Svg component='location' />
            </span>
          </div>
          <div>
            <input placeholder='City, neighborhood' value='Polaris' className='bg-transparent border-0 outline-none pl-2 truncate w-full' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
