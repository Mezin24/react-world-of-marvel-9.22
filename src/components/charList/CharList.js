import { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types'; // ES

import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CharItem from '../charItem/CharItem';

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(210);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [ended, setEnded] = useState(false);
  const [selecetedChar, setselecetedChar] = useState(null);

  const marvelService = useMemo(() => new MarvelService(), []);

  const onCharLoaded = (data) => {
    let ended = false;
    if (data.length < 9) {
      ended = true;
    }

    setLoading((prevState) => false);
    setChars((prevState) => [...prevState, ...data]);
    setOffset((prevState) => prevState + 9);
    setNewItemsLoading((prevState) => false);
    setEnded((prevState) => ended);
  };

  const getCharacters = useCallback(
    async (offset) => {
      setNewItemsLoading(true);
      try {
        const res = await marvelService.getAllCharacters(offset);
        onCharLoaded(res);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    },
    [marvelService]
  );

  const loadNewItemsHandler = () => {
    getCharacters(offset);
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
