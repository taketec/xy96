
import React, { createContext, useContext, useState , ReactNode } from 'react';
import { get_credits} from '../apis/api';

interface CreditsContextType {
  credits: number | null;
  getCredits: () => Promise<void>;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export const CreditsContextProvider = ({ children }: { children: ReactNode }) => {
  const [credits, setCredits] = useState<number | null>(null);

  const getCredits = async () => {
    try {
      const credits:any = await get_credits();
      if (credits) {
        setCredits(credits);
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  return (
    <CreditsContext.Provider value={{ credits, getCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};


export const useCreditsContext = () => {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error('put the component in the context');
  }
  return context;
};
