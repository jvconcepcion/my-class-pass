import { ReactNode, useState } from 'react';
import { SearchContext, MenuContext } from '@lib/context';

// 🟢 Search Provider
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

// 🟢 Menu Provider
export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

// 🟢 Combine Providers for Cleaner Code
export const Provider = ({ children }: { children: ReactNode }) => (
  <SearchProvider>
    <MenuProvider>{children}</MenuProvider>
  </SearchProvider>
);