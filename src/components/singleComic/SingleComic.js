import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singleComic.scss';

const SingleComic = () => {
  const { comicId } = useParams();
  const [comics, setComics] = useState(null);
  const { loading, error, getComics } = useMarvelService();

  useEffect(() => {
    getComics(comicId).then(setComics);
  }, [getComics, comicId]);

  let content = <View {...comics} />;

  if (loading) {
    content = <Spinner />;
  }

  if (error) {
    content = <ErrorMessage />;
  }

  return content;
};

const View = (props) => {
  return (
    <div className='single-comic'>
      <img
        src={props.thumbnail}
        alt={props.title}
        className='single-comic__img'
      />
      <div className='single-comic__info'>
        <h2 className='single-comic__name'>{props.title}</h2>
        <p className='single-comic__descr'>{props.description}</p>
        <p className='single-comic__descr'>{props.pageCount}</p>
        <p className='single-comic__descr'>Language: {props.language}</p>
        <div className='single-comic__price'>{props.price}</div>
      </div>
      <Link to='/comics' className='single-comic__back'>
        Back to all
      </Link>
    </div>
  );
};

export default SingleComic;
