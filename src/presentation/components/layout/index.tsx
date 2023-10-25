import Header from '../header';
import { StyledLayout } from './styles';

interface IProps {
  children: any;
}

const Layout = (props: IProps) => {
  const { children } = props;

  return (
    <StyledLayout>
      <Header />
      {children}
    </StyledLayout>
  );
};

export default Layout;
