
import React, { createContext, useContext, useState , ReactNode } from 'react';
import { get_credits} from '../apis/api';
import { create_fooocus_prediction } from '../apis/api';
import { AspectRatioOption, QualityOption } from '../components/Imto3d';

import { Istatus } from '../apis/api';

interface StateContextType {
  fooocusStatus: Istatus | null; 
  zoedepthStatus: Istatus | null; 
  triposrStatus: Istatus | null; 
  createFooocusPrediction: ( data: {prompt:string ,aspectRatio:AspectRatioOption, quality :QualityOption} )  => Promise<void>;
  createZoedepthPrediction: () => void;
  createTriposrPrediction: () => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const [fooocusStatus, setFooocusStatus] = useState<Istatus | null>(null);
  const [zoedepthStatus, setZoedepthStatus] = useState<Istatus | null>(null);
  const [triposrStatus, setTriposrStatus] = useState<Istatus | null>(null);

  const createFooocusPrediction = async ( data: {prompt:string ,aspectRatio:AspectRatioOption, quality :QualityOption} ) => {
    //api call + set up polling
    //setstate(res.data)
    //if state = processing, call the get credits api??? how do we do that or just do it from the internal components.
    //if output || cancelled, setstatus , stop polling
    let res = await create_fooocus_prediction(data)
    console.log(res?.data)
  }
  
  const createZoedepthPrediction =  () => {
    //same as the above

  
  }

  const createTriposrPrediction =  () => {
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
