const ComicsItem = (props) => {
  return (
    <li className='comics__item'>
      <a href={props.homepage}>
        <img
          src={props.thumbnail}
          alt={props.title}
          className='comics__item-img'
        />
        <div className='comics__item-name'>{props.title}</div>
        <div className='comics__item-price'>{props.price}$</div>
      </a>
    </li>
  );
};

export default ComicsItem;
