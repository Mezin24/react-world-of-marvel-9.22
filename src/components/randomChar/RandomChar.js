import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {
  state = {
    char: {
      name: null,
      description: null,
      thumbnail: null,
      homepage: null,
      wiki: null,
    },
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.getRandomChar();

    // this.timerId = setInterval(() => {
    //   this.getRandomChar();
    // }, 4000);
  }

  //   componentWillUnmount() {
  //     clearInterval(this.timerId);
  //   }

  marvelService = new MarvelService();

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  getRandomChar = async () => {
    try {
      const randomId = Math.floor(
        Math.random() * (1011400 - 1011000) + 1011000
      );
      const char = await this.marvelService.getCharacter(randomId);
      this.onCharLoaded(char);
    } catch (err) {
      this.onError();
    }
  };

  updateCharHandler = () => {
    this.setState({ loading: true });
    this.getRandomChar();
  };

  render() {
    const { char, loading, error } = this.state;

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
          <button
            className='button button__main'
            onClick={this.updateCharHandler}
          >
            <div className='inner'>try it</div>
          </button>
          <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
        </div>
      </div>
    );
  }
}

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
