import React, { useEffect, useState, useContext } from 'react';
import { get_credits } from '../apis/api';
import { useCreditsContext } from '../context/CreditsContextProvider';
import { useStateContext } from '../context/StateContextProvider';


const Imto3d = () => {

  const { credits, getCredits } = useCreditsContext();

  const {fooocusStatus, zoedepthStatus ,triposrStatus, createFooocusPrediction, createZoedepthPrediction ,createTriposrPrediction} = useStateContext();

  useEffect(() => {
    console.log(fooocusStatus);
  }, [fooocusStatus]);

  return (
    <div className="bg-discord-dark min-h-screen text-white flex flex-col items-center justify-center p-4">
      <div className="bg-discord-dark-secondary p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <h1 className="text-2xl text-black font-bold mb-4">Fooocus Prediction Status</h1>
        {fooocusStatus && fooocusStatus.output ? (
          <div>
            <div className="relative pb-9/16 mb-4 w-full overflow-hidden rounded-lg bg-gray-800">
              <img src={fooocusStatus.output} alt="Fooocus Prediction Output" className="absolute top-0 left-0 w-full h-full object-contain" />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Finalize
            </button>
          </div>
        ) : (
          <>
            <p className = "text-black" > No output available yet. Please wait...</p>
            {fooocusStatus && <p>{fooocusStatus.status}</p>}
          </>
        )}
      </div>
    </div>
      );};

export default Imto3d;
