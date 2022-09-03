import { Component } from 'react';

class CharItem extends Component {
  render() {
    const { name, thumbnail } = this.props;

    const imgStyle = thumbnail.includes('image_not_available')
      ? { objectFit: 'fill' }
      : { objectFit: 'cover' };

    return (
      <li className='char__item' onClick={this.props.onSelectChar}>
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div className='char__name'>{name}</div>
      </li>
    );
  }
}

export default CharItem;
