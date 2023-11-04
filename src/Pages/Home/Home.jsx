import ToDo from "../../Components/ToDo/ToDo";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <span className={styles.h1}>ToDo List</span>
      <ToDo />
    </div>
  );
};

export default Home;
