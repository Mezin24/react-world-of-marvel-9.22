import { useCallback, useEffect, useMemo, useState } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
  const [char, setChar] = useState({
    name: null,
    description: null,
    thumbnail: null,
    homepage: null,
    wiki: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const marvelService = useMemo(() => new MarvelService(), []);

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const getRandomChar = useCallback(async () => {
    try {
      setError(false);
      const randomId = Math.floor(
        Math.random() * (1011400 - 1011000) + 1011000
      );
      const char = await marvelService.getCharacter(randomId);
      onCharLoaded(char);
    } catch (err) {
      onError();
    }
  }, [marvelService]);

  const updateCharHandler = () => {
    setLoading(true);
    getRandomChar();
  };

  useEffect(() => {
    getRandomChar();
  }, [getRandomChar]);

  let content = <View char={char} />;

  if (loading) {
    content = <Spinner />;
  }

  if (error) {
    content = <ErrorMessage />;
  }

  return (
    <div className='randomchar'>
      {content}
      <div className='randomchar__static'>
        <p className='randomchar__title'>
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className='randomchar__title'>Or choose another one</p>
        <button className='button button__main' onClick={updateCharHandler}>
          <div className='inner'>try it</div>
        </button>
        <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  const imgStyle = thumbnail.includes('image_not_available')
    ? { objectFit: 'contain' }
    : { objectFit: 'cover' };

  return (
    <div className='randomchar__block'>
      <img
        src={thumbnail}
        alt={name}
        className='randomchar__img'
        style={imgStyle}
      />
      <div className='randomchar__info'>
        <p className='randomchar__name'>{name}</p>
        <p className='randomchar__descr'>{description}</p>
        <div className='randomchar__btns'>
          <a href={homepage} className='button button__main'>
            <div className='inner'>homepage</div>
          </a>
          <a href={wiki} className='button button__secondary'>
            <div className='inner'>Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
