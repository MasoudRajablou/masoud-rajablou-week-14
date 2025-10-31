import {
  MdOutlineDeleteForever,
  MdOutlineEdit,
  MdOutlineMailOutline,
  MdOutlinePhoneAndroid,
} from "react-icons/md";

import styles from "../modules/ContactCard.module.css";
import { VscThreeBars } from "react-icons/vsc";
import { useState } from "react";

function ContactCard({
  contact: { id, firstName, lastName, email, phone },
  optionHandler,
  isOpenId,
  editHandler,
  deleteHandler,
}) {
  const [opened, setOpened] = useState(false);

  return (
    <li key={id} className={styles.card}>
      <p>{`${firstName} ${lastName}`}</p>
      <p>
        <span>
          <MdOutlinePhoneAndroid />
        </span>
        {phone}
      </p>
      <p>
        <span>
          <MdOutlineMailOutline />
        </span>
        {email}
      </p>
      <div
        className={styles.option}
        onPointerOver={() => {
          optionHandler(id);
          setOpened(true);
        }}
        onPointerLeave={() => {
          optionHandler(null);
          setOpened(false);
        }}
      >
        <button>{!opened && <VscThreeBars />}</button>
        {isOpenId === id && (
          <>
            <button onClick={() => editHandler(id)}>
              <MdOutlineEdit />
            </button>
            <button onClick={() => deleteHandler(id)}>
              <MdOutlineDeleteForever />
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default ContactCard;
