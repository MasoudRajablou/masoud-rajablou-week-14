import Modal from "./Modal";

import { MdOutlineAddBox, MdSelectAll } from "react-icons/md";

import styles from "../modules/Header.module.css";

function Header({
  originalContacts,
  addContactHandler,
  addContact,
  saveHandler,
  setAddContact,
  alert,
  selectBtnHandler,
  setSearch,
}) {
  return (
    <div className={styles.container}>
      <h1>Contact List</h1>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search name, number or mail"
          onChange={e => setSearch(e.target.value.toLowerCase().trim())}
        />
        <button title="select contacts" onClick={selectBtnHandler}>
          <MdSelectAll />
        </button>
        <button title="Add new contact" onClick={addContactHandler}>
          <MdOutlineAddBox />
        </button>
      </div>

      {addContact && (
        <Modal
          originalContacts={originalContacts}
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
