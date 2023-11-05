import styles from "./AppFooter.module.css";
import { FaGithub } from "react-icons/fa";

const AppFooter = () => {
  return (
    <>
      <div className={styles.footer}>
        <div>
          <a href="https://github.com/iSRHcoder" style={{ color: "black" }}>
            <FaGithub />
          </a>
        </div>
        <div>`Made with ❤️ by iSRHcoder [2023]`</div>
      </div>
    </>
  );
};
export default AppFooter;
