import Routes from './router';
import Navigation from './components/navigation';
import './assets/css/w3.css';
import { FC } from 'react';
import Menu from './components/menu';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { loggingUser } from './redux/actions/logginUser';

const cookies = new Cookies();

const App: FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
      const userInformation = cookies.get('user_parcours_client');
      console.log(userInformation);
      dispatch(loggingUser({
        id: parseInt(userInformation.userId),
        username: userInformation.username,
        role: userInformation.role[0],
        token: userInformation.payload.token,
        name: userInformation.username
      }));
  }, [dispatch]);

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="main">
        <Menu />
        <Routes />
      </main>
    </>
  )
}

export default App;
