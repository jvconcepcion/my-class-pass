import { createContext } from 'react';

// Search Context
export interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const SearchContext = createContext<SearchContextType | null>(null);

// Menu Context
export interface MenuContextType {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const MenuContext = createContext<MenuContextType | null>(null);