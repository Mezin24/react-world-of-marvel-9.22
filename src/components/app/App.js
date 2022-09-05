import { Route, Switch } from 'react-router-dom';

import Layout from '../../layout/Layout';
import { MainPage, ComicsPage, SingleComicPage } from '../../pages';

const App = () => {
  return (
    <Layout>
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
      </Switch>
    </Layout>
  );
};

export default App;
