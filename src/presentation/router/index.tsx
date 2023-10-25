import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout';
import { appRoutes } from './appRoutes';

const AppRouter = () => {
  const privateRoutes = appRoutes.filter((route) => route.isPrivate);
  const publicRoutes = appRoutes.filter((route) => !route.isPrivate);

  return (
    <BrowserRouter>
      <Routes>
        {privateRoutes.map((privateRoute) => (
          <Route
            key={privateRoute.path}
            path={privateRoute.path}
            element={
              <Layout>
                <privateRoute.component />
              </Layout>
            }
          />
        ))}
        {publicRoutes.map((publicRoute) => (
          <Route
            key={publicRoute.path}
            path={publicRoute.path}
            element={
              <Layout>
                <publicRoute.component />
              </Layout>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
