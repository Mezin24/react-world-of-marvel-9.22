import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types'; // ES
import useMarvelService from '../../services/MarvelService';

import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CharItem from '../charItem/CharItem';

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [offset, setOffset] = useState(210);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [ended, setEnded] = useState(false);
  const [selecetedChar, setselecetedChar] = useState(null);

  const { loading, error, getAllCharacters } = useMarvelService();

  const onCharLoaded = (data) => {
    let ended = false;
    if (data.length < 9) {
      ended = true;
    }

    setChars((prevState) => [...prevState, ...data]);
    setOffset((prevState) => prevState + 9);
    setNewItemsLoading((prevState) => false);
    setEnded((prevState) => ended);
  };

  const getCharacters = useCallback(
    async (offset = 210, init = true) => {
      if (!init) {
        setNewItemsLoading(true);
      }
      getAllCharacters(offset).then((data) => {
        onCharLoaded(data);
      });
    },
    [getAllCharacters]
  );

  const loadNewItemsHandler = () => {
    getCharacters(offset, false);
  };

  const onSelectItemHandler = (itemId) => {
    props.onSelectChar(itemId);
    setselecetedChar(itemId);
  };

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  let content = (
    <ul className='char__grid'>
      {chars.map((item) => (
        <CharItem
          key={item.id}
          thumbnail={item.thumbnail}
          name={item.name}
          onSelectChar={onSelectItemHandler}
          id={item.id}
          isActive={selecetedChar === item.id}
        />
      ))}
    </ul>
  );

  if (loading && !newItemsLoading) {
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
        onClick={loadNewItemsHandler}
        style={{ display: ended ? 'none' : 'block' }}
      >
        <div className='inner'>
          {newItemsLoading ? 'Loading...' : 'load more'}
        </div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onSelectChar: PropTypes.func.isRequired,
};

export default CharList;
