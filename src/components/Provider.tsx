import { ReactNode, useState } from 'react';
import { LoggedInMemberContext, SearchContext, MenuContext } from '@lib/context';

// Current Login Member
export const LoggedInProvider = ({ children }: { children: ReactNode }) => {
  const [loggedInMember, setLoggedInMember] = useState(null);

  return (
    <LoggedInMemberContext.Provider value={{ loggedInMember, setLoggedInMember }}>
      {children}
    </LoggedInMemberContext.Provider>
  );
};

// 🟢 Search Provider
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

// 🟢 Menu Provider for search
export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

// 🟢 Combine Providers for Cleaner Code
export const Provider = ({ children }: { children: ReactNode }) => (
  <LoggedInProvider>
    <SearchProvider>
      <MenuProvider>{children}</MenuProvider>
    </SearchProvider>
  </LoggedInProvider>
);