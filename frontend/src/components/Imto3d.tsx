import React, { useEffect, useState, useContext } from 'react';
import { get_credits } from '../apis/api';
import { useCreditsContext } from '../context/CreditsContextProvider';
import { useStateContext } from '../context/StateContextProvider';


const Imto3d = () => {

  const { credits, getCredits } = useCreditsContext();

  const {fooocusStatus, zoedepthStatus ,triposrStatus, createFooocusPrediction, createZoedepthPrediction ,createTriposrPrediction} = useStateContext();

  useEffect(() => {
    console.log(fooocusStatus,zoedepthStatus);
    if(fooocusStatus?.status!="starting"||fooocusStatus?.status!="starting"){
      setTimeout(getCredits,
        1000
      )
    }
  }, [fooocusStatus,zoedepthStatus]);


  const handleFinalizeClick = () =>{
    if (fooocusStatus && fooocusStatus.output){
    createZoedepthPrediction({url:fooocusStatus?.output})
    }
  }


  return (
    <div className="bg-discord-dark min-h-screen text-white flex items-center justify-center p-4">
      <div className="bg-discord-dark-secondary p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <h1 className="text-2xl text-black font-bold mb-4">Fooocus Prediction Status</h1>
        {fooocusStatus && fooocusStatus.output ? (
          <div className="flex flex-col items-center">
            <img src={fooocusStatus.output} alt="Fooocus Prediction Output" className="w-full h-auto rounded-lg mb-4 object-contain" style={{ maxHeight: '30vh' }}/>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleFinalizeClick}>
              Finalize
            </button>
          </div>
        ) : (
          <div className="text-black">
            <p>No output available yet. Please wait...</p>
            {fooocusStatus && <p>{fooocusStatus.status}</p>}
          </div>
        )}
      </div>
    </div>
    );};

export default Imto3d;
