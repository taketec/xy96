import React from 'react';
import Threejs from '../components/Threejs';
import Imto3d from '../components/Imto3d';
import { CreditsContextProvider } from '../context/CreditsContextProvider';
const TestComponent = () => {
    return (
        <div className="bg-purple-500 w-full h-full flex items-center justify-center">
            Test Box
      </div>
    );
  };


  const MainPage = () => {
    return (
      <div className="flex flex-col items-center min-h-screen">
        <div className="flex justify-center w-full flex-1" style={{ maxHeight: '50vh' }}>
          <div className="flex-1 flex justify-center p-1 items-center" style={{ maxWidth: 'calc(33.33vw - 2px)', maxHeight: '50vh' }}>
          <CreditsContextProvider>
            <Imto3d />
            </CreditsContextProvider>

          </div>
          <div className="flex-1 flex justify-center p-1 items-center" style={{ maxWidth: 'calc(33.33vw - 2px)', maxHeight: '50vh' }}>
            <TestComponent />
          </div>          
          <div className="flex-1 flex justify-center p-1 items-center" style={{ maxWidth: 'calc(33.33vw - 2px)', maxHeight: '50vh' }}>
            <Threejs />
          </div>
        </div>
        <div className="flex justify-center w-full flex-1" style={{ maxHeight: '50vh' }}>
          <div className="flex-1 flex justify-center p-1 items-center" style={{ maxWidth: 'calc(33.33vw - 2px)', maxHeight: '50vh' }}>
            <TestComponent />
          </div>
          <div className="flex-1 flex justify-center p-1 items-center" style={{ maxWidth: 'calc(33.33vw - 2px)', maxHeight: '50vh' }}>
            <TestComponent />
          </div>
          <div className="flex-1 flex justify-center p-1 items-center" style={{ maxWidth: 'calc(33.33vw - 2px)', maxHeight: '50vh' }}>
            <TestComponent />
          </div>
        </div>
      </div>
    );
  };

  export default MainPage;