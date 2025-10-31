import Modal from "./Modal";

import { MdOutlineAddBox, MdSelectAll } from "react-icons/md";

import styles from "../modules/Header.module.css";

function Header({
  contacts,
  addContactHandler,
  addContact,
  saveHandler,
  setAddContact,
  alert,
}) {
  return (
    <div className={styles.container}>
      <h1>Contact List</h1>
      <div className={styles.search}>
        <input type="text" placeholder="Search name, number or mail" />
        <button title="select contacts">
          <MdSelectAll />
        </button>
        <button title="Add new contact" onClick={addContactHandler}>
          <MdOutlineAddBox />
        </button>
      </div>

      {addContact && (
        <Modal
          contacts={contacts}
          contact={""}
          setIsModalId={setAddContact}
          saveHandler={saveHandler}
          alert={alert}
        />
      )}
    </div>
  );
}

export default Header;
