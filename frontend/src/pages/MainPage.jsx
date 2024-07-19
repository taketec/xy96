import React from 'react';
import Threejs from '../components/Threejs';
import FooocusWindow from '../components/FooocusWindow';
import { CreditsContextProvider } from '../context/CreditsContextProvider';
import { StateContextProvider } from '../context/StateContextProvider';
import Imto3d from '../components/Imto3d';
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
          <StateContextProvider>
          <CreditsContextProvider>

        <div className="flex justify-center w-full flex-1" style={{ maxHeight: '50vh' }}>
          <div className="flex-1 flex justify-center p-1 items-center" style={{ maxWidth: 'calc(33.33vw - 2px)', maxHeight: '50vh' }}>
            <FooocusWindow />

          </div>
          <div className="flex-1 flex justify-center p-1 items-center" style={{ maxWidth: 'calc(33.33vw - 2px)', maxHeight: '50vh' }}>
            <Imto3d />
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
        </CreditsContextProvider>
        </StateContextProvider>
      </div>
    );
  };

  export default MainPage;