import { useEffect, useState } from "react";
import styles from "../modules/Modal.module.css";
import { MdOutlineCancelPresentation, MdSave } from "react-icons/md";

function Modal({
  originalContacts,
  contact,
  setIsModalId,
  saveHandler,
  alert,
}) {
  const [firstName, setFirstName] = useState(contact.firstName || "");
  const [lastName, setLastName] = useState(contact.lastName || "");
  const [phone, setPhone] = useState(contact.phone || "");
  const [email, setEmail] = useState(contact.email || "");

  const id = contact.id || originalContacts.length + 1;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{contact ? "Update Contact" : "Add Contact"} </h2>
        <div>
          <p>First Name</p>
          <input
            type="text"
            defaultValue={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <p>Last Name</p>
          <input
            type="text"
            defaultValue={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div>
          <p>Phone Number</p>
          <input
            type="number"
            defaultValue={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        <div>
          <p>Email Address</p>
          <input
            type="email"
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.alert}>
          {alert && (
            <>
              <p>{alert}</p>
              <div className={styles.progressBar}></div>
            </>
          )}
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.save}
            onClick={() => {
              saveHandler(id, firstName, lastName, phone, email);
            }}
          >
            <MdSave />
          </button>
          <button
            className={styles.close}
            onClick={() => setIsModalId(modal => (modal ? false : null))}
          >
            <MdOutlineCancelPresentation />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
