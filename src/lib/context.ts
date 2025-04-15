import { createContext } from 'react';

// Current Login Member
export interface LoggedInMemberType {
  loggedInMember: any;
  setLoggedInMember: React.Dispatch<React.SetStateAction<any>>;
}

export const LoggedInMemberContext = createContext<LoggedInMemberType | null>(null);

// Search Context
export interface SearchContextType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType | null>(null);

// Menu Context
export interface MenuContextType {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const MenuContext = createContext<MenuContextType | null>(null);