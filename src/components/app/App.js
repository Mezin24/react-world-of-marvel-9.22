import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import ComicsList from '../comicsList/ComicsList';
import AppBaner from '../appBanner/AppBanner';
import SingleComic from '../singleComic/SingleComic';
import Layout from '../../layout/Layout';

import decoration from '../../resources/img/vision.png';

const App = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onSelectChar = (charId) => {
    setSelectedChar(charId);
  };

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
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
        </Route>
        <Route path='/comics' exact>
          <AppBaner />
          <ComicsList />
        </Route>
        <Route path='/comics/:comicId'>
          <SingleComic />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
