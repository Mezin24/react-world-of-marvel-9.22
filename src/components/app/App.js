import { Component } from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

class App extends Component {
  state = {
    selectedChar: null,
  };

  onSelectChar = (charId) => {
    this.setState({ selectedChar: charId });
  };

  render() {
    const { selectedChar } = this.state;

    return (
      <div className='app'>
        <AppHeader />
        <main>
          <RandomChar />
          <div className='char__content'>
            <ErrorBoundary>
              <CharList onSelectChar={this.onSelectChar} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo selectedChar={selectedChar} />
            </ErrorBoundary>
          </div>
          <img className='bg-decoration' src={decoration} alt='vision' />
        </main>
      </div>
    );
  }
}

export default App;
