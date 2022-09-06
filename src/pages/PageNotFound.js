import ErrorMessage from '../components/errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <>
      <ErrorMessage />
      <p
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '32px',
          marginTop: '15px',
        }}
      >
        Page not found
      </p>
      <Link
        style={{
          display: 'block',
          textAlign: 'center',
          fontSize: '24px',
          marginTop: '10px',
        }}
        to='/'
      >
        Back to main page
      </Link>
    </>
  );
};

export default PageNotFound;
