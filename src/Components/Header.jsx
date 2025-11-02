import Modal from "./Modal";

import { MdOutlineAddBox, MdSelectAll } from "react-icons/md";

import styles from "../modules/Header.module.css";

function Header({
  originalContacts,
  addContactHandler,
  addContact,
  saveHandler,
  modalCancelHandler,
  alert,
  selectBtnHandler,
  setSearch,
  isModal,
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

      {isModal && (
        <Modal
          originalContacts={originalContacts}
          contact={null}
          modalCancelHandler={modalCancelHandler}
          saveHandler={saveHandler}
          alert={alert}
        />
      )}
    </div>
  );
}

export default Header;
