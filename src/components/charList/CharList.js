import './charList.scss';
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
    offset: 210,
    newItemsLoading: false,
    ended: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.getCharacters();
  }

  onCharLoaded = (data) => {
    let ended = false;
    if (data.length < 9) {
      ended = true;
    }

    this.setState((prevState) => ({
      loading: false,
      chars: [...prevState.chars, ...data],
      offset: prevState.offset + 9,
      newItemsLoading: false,
      ended,
    }));
  };

  getCharacters = async (offset) => {
    this.setState({ newItemsLoading: true });
    try {
      const res = await this.marvelService.getAllCharacters(offset);
      this.onCharLoaded(res);
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  loadNewItemsHandler = () => {
    this.getCharacters(this.state.offset);
  };

  render() {
    const { chars, loading, error, ended, newItemsLoading } = this.state;

    let content = (
      <ul className='char__grid'>
        {chars.map((item) => (
          <CharItem
            key={item.id}
            thumbnail={item.thumbnail}
            name={item.name}
            onSelectChar={() => this.props.onSelectChar(item.id)}
          />
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
        <button
          className='button button__main button__long'
          disabled={newItemsLoading}
          onClick={this.loadNewItemsHandler}
          style={{ display: ended ? 'none' : 'block' }}
        >
          <div className='inner'>
            {newItemsLoading ? 'Loading...' : 'load more'}
          </div>
        </button>
      </div>
    );
  }
}

export default CharList;
