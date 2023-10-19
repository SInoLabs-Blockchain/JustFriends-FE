import { Provider } from 'react-redux';
import RootContainer from 'src/presentation/router';
import './App.css';
import { store } from './data/redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
};

export default App;
