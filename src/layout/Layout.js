import AppHeader from '../components/appHeader/AppHeader';

const Layout = (props) => {
  return (
    <div className='app'>
      <AppHeader />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
