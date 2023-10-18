import { FiPlus } from 'react-icons/fi';
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Note } from '../../components/Note';
import { Section } from '../../components/Section';

export function Home() {
  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>
      <Header/>
      <Menu>
        <li><ButtonText title="Todos" isActive/></li>
        <li><ButtonText title="React"/></li>
        <li><ButtonText title="NodeJs"/></li>
      </Menu>
      <Search>
        <Input placeholder="Pesquisar pelo título"/>
      </Search>
      <Content>
        <Section title="Minhas Notas">
          <Note data={{title: 'React Modal', tags: [
            {id: '1', name: 'React'},
          ]
          }}
          />
          <Note data={{title: 'Exemplo de Middleware', tags: [
            {id: '1', name: 'express'},
            {id: '2', name: 'nodejs'}
          ]
          }}
          />
        </Section>
      </Content>
      <NewNote>
        <FiPlus/>
        Criar nota
      </NewNote>
    </Container>
  );
}