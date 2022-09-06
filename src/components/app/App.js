import { Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Layout from '../../layout/Layout';
import Spinner from '../spinner/Spinner';

const MainPage = lazy(() => import('../../pages/MainPage'));
const ComicsPage = lazy(() => import('../../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../../pages/SingleComicPage'));
const PageNotFound = lazy(() => import('../../pages/PageNotFound'));

const App = () => {
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/' exact>
            <MainPage />
          </Route>
          <Route path='/comics' exact>
            <ComicsPage />
          </Route>
          <Route path='/comics/:comicId'>
            <SingleComicPage />
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default App;
