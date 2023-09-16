import styles from "./style.module.css";
import gh from "../../assets/gh.png";

export function Footer() {
  return (
    <a
      className={styles.About__logo}
      href="https://github.com/S4mm4ael/tree-test-task"
      target="”_blank”"
    >
      <img src={gh} alt="GitHub" height="30px" title="My GitHub" />
    </a>
  );
}
