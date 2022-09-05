import { useState } from 'react';
import RandomChar from '../components/randomChar/RandomChar';
import CharList from '../components/charList/CharList';
import CharInfo from '../components/charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import decoration from '../resources/img/vision.png';

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onSelectChar = (charId) => {
    setSelectedChar(charId);
  };
  return (
    <>
      <RandomChar />
      <div className='char__content'>
        <ErrorBoundary>
          <CharList onSelectChar={onSelectChar} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo selectedChar={selectedChar} />
        </ErrorBoundary>
      </div>
      <img className='bg-decoration' src={decoration} alt='vision' />
    </>
  );
};

export default MainPage;
