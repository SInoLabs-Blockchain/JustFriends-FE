import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Layout from "src/components/Layout";
import { appRoutes } from './appRoutes';

const AppRouter = () => {
  const privateRoutes = appRoutes.filter((route) => route.isPrivate);
  const publicRoutes = appRoutes.filter((route) => !route.isPrivate);
  const accessToken = 'accessToken';

  return (
    <BrowserRouter>
      <Routes>
        {/* {privateRoutes.map((privateRoute) => (
          <Route
            key={privateRoute.path}
            path={privateRoute.path}
            element={
              accessToken ? (
                // <Layout>
                  <privateRoute.component />
                // </Layout>
              ) : (
                <Navigate to={ROUTE.SIGNIN} />
              )
            }
          />
        ))} */}
        {publicRoutes.map((publicRoute) => (
          <Route
            key={publicRoute.path}
            path={publicRoute.path}
            element={<publicRoute.component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
