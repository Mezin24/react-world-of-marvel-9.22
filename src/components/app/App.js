import { useState } from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import ComicsList from '../comicsList/ComicsList';
import AppBaner from '../appBanner/AppBanner';

import decoration from '../../resources/img/vision.png';

const App = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onSelectChar = (charId) => {
    setSelectedChar(charId);
  };

  return (
    <div className='app'>
      <AppHeader />
      <main>
        {/* <RandomChar />
        <div className='char__content'>
          <ErrorBoundary>
            <CharList onSelectChar={onSelectChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo selectedChar={selectedChar} />
          </ErrorBoundary>
        </div>
        <img className='bg-decoration' src={decoration} alt='vision' /> */}

        <AppBaner />
        <ComicsList />
      </main>
    </div>
  );
};

export default App;
