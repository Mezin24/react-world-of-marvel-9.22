import { Link } from 'react-router-dom';

const ComicsItem = (props) => {
  return (
    <li className='comics__item'>
      <Link to={`/comics/${props.id}`}>
        <img
          src={props.thumbnail}
          alt={props.title}
          className='comics__item-img'
        />
        <div className='comics__item-name'>{props.title}</div>
        <div className='comics__item-price'>{props.price}$</div>
      </Link>
    </li>
  );
};

export default ComicsItem;
