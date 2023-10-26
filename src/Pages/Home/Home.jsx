import ToDo from "../../Components/ToDo/ToDo";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.h1}>ToDo List</h1>
      <ToDo />
    </div>
  );
};

export default Home;
