
import React, { createContext, useContext, useState , ReactNode } from 'react';
import { get_credits} from '../apis/api';

interface prediction {
  id: string,
  status:string,
  type:string,
  output?:string
}

interface StateContextType {
  fooocusStatus: prediction | null; 
  zoedepthStatus: prediction | null; 
  triposrStatus: prediction | null; 
  createFooocusPrediction: () => Promise<void>;
  createZoedepthPrediction: () => Promise<void>;
  createTriposrPrediction: () => Promise<void>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const CreditsContextProvider = ({ children }: { children: ReactNode }) => {
  const [fooocusStatus, setFooocusStatus] = useState<prediction | null>(null);
  const [zoedepthStatus, setZoedepthStatus] = useState<prediction | null>(null);
  const [triposrStatus, setTriposrStatus] = useState<prediction | null>(null);

  const createFooocusPrediction = async () => {
    //api call + set up polling
    //setstate(res.data)
    //if state = processing, call the get credits api??? how do we do that or just do it from the internal components.
    //if output || cancelled, setstatus , stop polling
  }
  
  const createZoedepthPrediction = async () => {
    //same as the above
  }

  const createTriposrPrediction = async () => {
    //same as the above
  }


  return (
    <StateContext.Provider value={{ fooocusStatus, zoedepthStatus ,triposrStatus, createFooocusPrediction, createZoedepthPrediction ,createTriposrPrediction}}>
      {children}
    </StateContext.Provider>
  );
};


export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('put the component in the context');
  }
  return context;
};
