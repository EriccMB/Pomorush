// CRIAMOS UM ARQUIVO MainTemplate, QUE SERÁ O TEMPLATE PADRÃO DA PAGINA, COM MENU, FOOTER, ETC
// VAI RECEBER UM CHILDREN, QUE SERÁ O CONTEÚDO DA PÁGINA
// POR EXEMPLO
// NO HOME:
// <MainTemplate>Home</MainTemplate>:

import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Logo } from '../../components/Logo';
import { Menu } from '../../components/Menu';

type MainTemplateProps = {
  children: React.ReactNode;
};

export function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      {children}

      <Container>
        <Footer />
      </Container>
    </>
  );
}
