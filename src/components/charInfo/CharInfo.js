import { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types'; // ES
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import Spinner from '../../components/spinner/Spinner';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    if (!props.selectedChar) {
      return;
    }
    clearError();
    getCharacter(props.selectedChar).then((char) => setChar(char));
  }, [getCharacter, props.selectedChar, clearError]);

  let content = <Skeleton />;

  if (char) {
    content = <View char={char} />;
  }

  if (loading) {
    content = <Spinner />;
  }

  if (error) {
    content = <ErrorMessage />;
  }

  return <div className='char__info'>{content}</div>;
};

const View = (props) => {
  const { name, description, thumbnail, homepage, wiki, comics } = props.char;

  let comicsContent =
    'Unfotionatly we do not have information about comicses with this character';

  if (comics.length > 0) {
    comicsContent = comics.slice(0, 10).map((item, i) => (
      <li key={i} className='char__comics-item'>
        {item.name}
      </li>
    ));
  }

  const imgStyle = thumbnail.includes('image_not_available')
    ? { objectFit: 'contain' }
    : { objectFit: 'cover' };

  return (
    <>
      <div className='char__basics'>
        <img src={thumbnail} alt='abyss' style={imgStyle} />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main'>
              <div className='inner'>homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description}</div>
      <div className='char__comics'>Comics:</div>
      <ul className='char__comics-list'>{comicsContent}</ul>
    </>
  );
};

CharInfo.propTypes = {
  selectedChar: PropTypes.number,
};
export default CharInfo;
