import { useEffect, useState } from "react";

import ContactList from "./ContactList";
import Modal from "./Modal";

import styles from "../modules/Contacts.module.css";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [isOpenId, setIsOpenId] = useState(null);
  const [isModalId, setIsModalId] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/MOCK_DATA.json");
        const json = await res.json();
        setContacts(json);
      } catch (error) {
        console.err(error);
      }
    };

    fetchContacts();
  }, []);

  const optionHandler = id => {
    setIsOpenId(id);
  };

  const editHandler = id => {
    setIsModalId(id);
  };

  const deleteHandler = id => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  };

  const saveHandler = (id, firstName, lastName, phone, email) => {
    const updatedContact = contacts.map(contact => {
      if (contact.id === id) {
        return {
          id,
          firstName,
          lastName,
          phone,
          email,
        };
      }
      return contact;
    });

    setContacts(updatedContact);
  };

  return (
    <div className={styles.container}>
      <ul>
        {contacts.map(contact => (
          <ContactList
            key={contact.id}
            contact={contact}
            optionHandler={optionHandler}
            isOpenId={isOpenId}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            isModalId={isModalId}
          />
        ))}
      </ul>

      {!!isModalId && (
        <Modal
          contact={contacts.find(contact => contact.id === isModalId)}
          setIsModalId={setIsModalId}
          saveHandler={saveHandler}
        />
      )}
    </div>
  );
}

export default Contacts;
