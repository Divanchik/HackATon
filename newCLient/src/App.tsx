import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { Header } from './components';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Routes>
    </>
  );
};

export default App;
