import { useEffect, useState, useCallback } from 'react';
import useMarvelService from '../../services/MarvelService';
import ComicsItem from '../comicsItem/comicsItem';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';

const ComicsList = () => {
  const { loading, error, getAllComics } = useMarvelService();
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newComicsLoading, setNewComicsLoading] = useState(false);

  const onRenderComics = useCallback(
    async (offset) => {
      return getAllComics(offset).then((data) => {
        setComics((prevState) => [...prevState, ...data]);
        setNewComicsLoading(false);
      });
    },
    [getAllComics]
  );

  useEffect(() => {
    onRenderComics();
    setOffset((prevState) => prevState + 8);
  }, [onRenderComics]);

  const addNewComicsHandler = () => {
    onRenderComics(offset);
    setNewComicsLoading(true);
    setOffset((prevState) => prevState + 8);
  };

  let content = (
    <ul className='comics__grid'>
      {comics.map((item, i) => (
        <ComicsItem key={i} {...item} />
      ))}
    </ul>
  );

  if (loading && !newComicsLoading) {
    content = <Spinner />;
  }

  if (error) {
    content = <ErrorMessage />;
  }

  return (
    <div className='comics__list'>
      <ul className='comics__grid'></ul>
      {content}
      <button
        disabled={newComicsLoading}
        onClick={addNewComicsHandler}
        className='button button__main button__long'
      >
        <div className='inner'>
          {newComicsLoading ? 'Loading...' : 'load more'}
        </div>
      </button>
    </div>
  );
};

export default ComicsList;
