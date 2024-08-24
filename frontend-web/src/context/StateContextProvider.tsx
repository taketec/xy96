
import React, { createContext, useContext, useState , ReactNode } from 'react';
import { get_credits} from '../apis/api';
import { create_fooocus_prediction, create_zoedepth_prediction ,Istatus , get_prediction_status} from '../apis/api';
import { AspectRatioOption, QualityOption } from '../components/FooocusWindow';

interface StateContextType {
  fooocusStatus: Istatus | null; 
  zoedepthStatus: Istatus | null; 
  triposrStatus: Istatus | null; 
  createFooocusPrediction: ( data: {prompt:string ,aspectRatio:AspectRatioOption, quality :QualityOption} )  => Promise<void>;
  createZoedepthPrediction: (data: {url:string}) => Promise<void>;
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
    console.log(data, "this is the prompt")
    let res = await create_fooocus_prediction(data) 
    console.log(res?.data)
    if(res?.data.prediction_id){
    const pollStatus = async (predictionId: string) => {
      let intervalId = setInterval(async () => {
        let apistatus = await get_prediction_status(predictionId, 'fooocus');

        if (apistatus) {
          if (apistatus.data.output || apistatus.data.status=="succeeded" || apistatus.data.status as string =="cancelled") {
            setFooocusStatus({
              id: apistatus.data.id,
              status: apistatus.data.status,
              type: apistatus.data.type,
              output: apistatus.data.output,
            });
            clearInterval(intervalId); // Stop polling
          } else {
            setFooocusStatus({
              id: apistatus.data.id,
              status: apistatus.data.status,
              type: apistatus.data.type,
            });
          }
        }
      }, 1000); // Poll every 5 seconds
    };
    // Start polling the status API
    await pollStatus(res?.data.prediction_id as string);
    }
  }
  
  const createZoedepthPrediction =  async(data:{url:string}) => {
    //same as the above
    console.log(data, "this is the image")
    let res = await create_zoedepth_prediction(data) 
    console.log(res?.data)
    if(res?.data.prediction_id){
    const pollStatus = async (predictionId: string) => {
      let intervalId = setInterval(async () => {
        let apistatus = await get_prediction_status(predictionId, 'fooocus');

        if (apistatus) {
          if (apistatus.data.output || apistatus.data.status=="succeeded" || apistatus.data.status as string =="cancelled") {
            setZoedepthStatus({
              id: apistatus.data.id,
              status: apistatus.data.status,
              type: apistatus.data.type,
              output: apistatus.data.output,
            });
            clearInterval(intervalId); // Stop polling
          } else {
            setZoedepthStatus({
              id: apistatus.data.id,
              status: apistatus.data.status,
              type: apistatus.data.type,
            });
          }
        }
      }, 1000); // Poll every 5 seconds
    };
    // Start polling the status API
    await pollStatus(res?.data.prediction_id as string);
    }
  
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
