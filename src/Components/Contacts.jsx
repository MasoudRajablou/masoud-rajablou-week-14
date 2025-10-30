import { useEffect, useState } from "react";

import ContactList from "./ContactList";

import styles from "../modules/Contacts.module.css";

function Contacts() {
  const [contacts, setContacts] = useState([]);

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

  return (
    <div className={styles.container}>
      <ul>
        {contacts.map(contact => (
          <ContactList
            key={contact.id}
            contact={contact}
            optionHandler={optionHandler}
          />
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
