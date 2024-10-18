import React, { createContext, useState } from 'react';
import { TabType } from '../../types';

interface TodoContextType {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <TodoContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TodoContext.Provider>
  );
};