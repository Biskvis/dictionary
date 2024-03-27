import React, { useState} from 'react'; 
import Axios from 'axios';
import './App.css';

function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [word, setWord] = useState([]);
  const [failed, setFailed] = useState(false); 

  function getMeaning() {
    Axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchTerm}`
    ).then((response) => {
      setFailed(false)
      setWord(response.data[0]);
    })
    .catch(function (error) {
        setFailed(true)
    })
  }
  
  return (
    <>
      <div className='m-20 flex flex-col justify-center items-center'>
        <h1 className='text-center font-bold text-6xl text-green-700 clicker-script-regular'>Dictionary</h1>
        <div>
          <div className="relative w-sm mx-auto mt-20">
            <input
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="search"
              placeholder="Search"
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-green-600 border border-gray-300 rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onClick={getMeaning}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
              </svg>
            </button>
          </div>
          { word.length !== 0 && !failed ? (
            <div className='flex flex-col justify-center items-left p-4 max-w-96'>
              <h1 className='text-3xl underline mb-4'>{word.word} </h1>
              <p className='font-bold text-xl'>Parts of speech:</p>
              <p className='text-xl'>{word.meanings[0].partOfSpeech}</p>
              <p className='font-bold text-xl'>Definition</p>
              <p className='text-xl'>{word.meanings[0].definitions[0].definition}</p>
              {word.meanings[0].definitions[0].example && (
                <div>
                  <p className='font-bold text-xl'>Example</p>
                  <p className='text-xl'>{word.meanings[0].definitions[0].example}</p>
                </div>
              )}
            </div>
          ) : failed && (
            <h1>Could not find that word</h1>
          )}

            
        </div>
      </div>
    </>
  );
}

export default App;
