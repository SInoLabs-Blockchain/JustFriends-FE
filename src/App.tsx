import { Web3Modal } from "@web3modal/react";
import { Provider } from "react-redux";
import RootContainer from "src/presentation/router";
import { WagmiConfig } from "wagmi";
import "./App.css";
import { store } from "./data/redux/Store";
import useWagmi from "./presentation/hooks/useWagmi";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { appRoutes } from "./presentation/router/appRoutes";

// fonts
import './presentation/theme/assets/fonts/Gilroy-Bold.ttf';
import './presentation/theme/assets/fonts/Gilroy-Medium.ttf';
import './presentation/theme/assets/fonts/Gilroy-Regular.ttf';
import './presentation/theme/assets/fonts/Gilroy-Semibold.ttf';

const App = () => {
  const projectId: string = process.env.REACT_APP_PROJECT_ID || '';
  const { ethereumClient, wagmiConfig } = useWagmi();

  const router = createBrowserRouter(appRoutes);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <WagmiConfig config={wagmiConfig}>
        <RootContainer />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </Provider>
  );
};

export default App;
