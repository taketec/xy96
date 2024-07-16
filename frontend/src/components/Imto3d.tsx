import React, { useEffect, useState, useContext } from 'react';
import { get_credits } from '../apis/api';
import { useCreditsContext } from '../context/CreditsContextProvider';

type QualityOption = 'Low' | 'Medium' | 'High';
type AspectRatioOption = '16:9' | '4:3' | '1:1';

const qualityOptions: QualityOption[] = ['Low', 'Medium', 'High'];
const aspectRatioOptions: AspectRatioOption[] = ['16:9', '4:3', '1:1'];


const Imto3d = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [quality, setQuality] = useState<QualityOption>('Medium');
  const [aspectRatio, setAspectRatio] = useState<AspectRatioOption>('16:9');

  const { credits, getCredits } = useCreditsContext();

  useEffect(() => {
    getCredits();
  }, []);

  useEffect(() => {console.log(credits)  }, [credits]);




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { prompt, quality, aspectRatio };
    
    try {
      const response = await fetch('https://api.example.com/image-to-3d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <p>Credits: {credits !== null ? credits : 'Loading...'}</p>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
            Prompt
          </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        
        <div>
          <label htmlFor="quality" className="block text-sm font-medium text-gray-700">
            Quality
          </label>
          <select
            id="quality"
            value={quality}
            onChange={(e) => setQuality(e.target.value as QualityOption)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {qualityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-700">
            Aspect Ratio
          </label>
          <select
            id="aspectRatio"
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as AspectRatioOption)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {aspectRatioOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Imto3d;
