import styles from "../modules/Message.module.css";

function Message({ msg }) {
  return (
    <div className={styles.alertBox}>
      <p>{msg}</p>
      <div className={styles.progressBar}>
        <div className={styles.fill}></div>
      </div>
    </div>
  );
}

export default Message;
