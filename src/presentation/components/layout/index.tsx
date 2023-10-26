import Footer from '../footer';
import Header from '../header';
import { StyledContent, StyledLayout } from './styles';

interface IProps {
  children: any;
}

const Layout = (props: IProps) => {
  const { children } = props;

  return (
    <StyledLayout>
      <Header />
      <StyledContent>{children}</StyledContent>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
