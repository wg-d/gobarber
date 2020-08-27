import React from 'react';
import { Container, Content, Background} from './styles';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} />

      <form>
        <h1>Faça seu logon</h1>
        <Input icon={FiMail} name="email" placeholder="E-mail" />
        <Input icon={FiLock} name="password" type="password" placeholder="Senha"/>
        <Button>Entrar</Button>
        <a href="">Esqueci minha senha</a>
      </form>

      <a href="">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background></Background>
  </Container>
);

export default SignIn;
