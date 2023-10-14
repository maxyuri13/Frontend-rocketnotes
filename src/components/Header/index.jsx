import { RiShutDownLine } from 'react-icons/ri';
import { Container, Profile, Logout } from "./styles";

export function Header() {
  return (
    <Container>
      <Profile>
        <img src="https://github.com/maxyuri13.png" alt="Foto do usuário"/>
        <div>
          <span>Welcome,</span>
          <strong>Max Yuri</strong>
        </div>
      </Profile>
      <Logout>
        <RiShutDownLine/>
      </Logout>

    </Container>
  );
}