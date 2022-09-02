import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CharItem from '../charItem/CharItem';

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.getCharacters();
  }

  onCharLoaded = (data) => {
    this.setState({ loading: false, chars: data });
  };

  getCharacters = async () => {
    try {
      const res = await this.marvelService.getAllCharacters();
      this.onCharLoaded(res);
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { chars, loading, error } = this.state;

    let content = (
      <ul className='char__grid'>
        {chars.map((item) => (
          <CharItem key={item.id} thumbnail={item.thumbnail} name={item.name} />
        ))}
      </ul>
    );

    if (loading) {
      content = <Spinner />;
    }

    if (error) {
      content = <ErrorMessage />;
    }

    return (
      <div className='char__list'>
        {content}
        <button className='button button__main button__long' disabled={loading}>
          <div className='inner'>{loading ? 'Loading...' : 'load more'}</div>
        </button>
      </div>
    );
  }
}

export default CharList;
