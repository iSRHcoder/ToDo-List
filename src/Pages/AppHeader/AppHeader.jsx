import { Container, Navbar } from "react-bootstrap";
import styles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <header>
      <Navbar className={styles.AppHeader}>
        <Container>
          <Navbar.Brand href="#home">ToDo App</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};
export default AppHeader;
