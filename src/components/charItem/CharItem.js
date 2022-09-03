import { Component } from 'react';

class CharItem extends Component {
  keySelectHandler = (event) => {
    if (event.key === 'Enter') {
      this.props.onSelectChar(this.props.id);
    }
  };
  render() {
    const { name, thumbnail } = this.props;

    const imgStyle = thumbnail.includes('image_not_available')
      ? { objectFit: 'fill' }
      : { objectFit: 'cover' };

    const clazz = `char__item ${
      this.props.isActive ? 'char__item_selected' : ''
    }`;

    return (
      <li
        tabIndex='0'
        className={clazz}
        onClick={() => this.props.onSelectChar(this.props.id)}
        onKeyDown={this.keySelectHandler}
      >
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div className='char__name'>{name}</div>
      </li>
    );
  }
}

export default CharItem;
