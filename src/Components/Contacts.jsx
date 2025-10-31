import { useEffect, useState } from "react";
import { ThreeDot } from "react-loading-indicators";

import Header from "./Header";
import ContactList from "./ContactList";
import Modal from "./Modal";

import styles from "../modules/Contacts.module.css";
import Message from "./Message";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [isOpenId, setIsOpenId] = useState(null);
  const [isModalId, setIsModalId] = useState(null);
  const [addContact, setAddContact] = useState(false);
  const [alert, setAlert] = useState("");
  const [msg, setMsg] = useState("");

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
    if (!firstName || !lastName || !email || !phone) {
      setAlert("Please insert valid data!");

      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }

    setAlert("");

    if (!addContact) {
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

      setIsModalId(null);
      setContacts(updatedContact);
      showMessage("The contact is updated!");
    } else {
      setContacts([
        ...contacts,
        {
          id: id,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: email,
        },
      ]);
      setAddContact(false);
      showMessage("New contact is added!");
    }
  };

  const selectHandler = () => {};

  const addContactHandler = () => {
    setAddContact(true);
  };

  const showMessage = message => {
    setMsg(message);

    setTimeout(() => {
      setMsg("");
    }, 3000);
  };

  return (
    <>
      <>{msg && <Message msg={msg} />}</>
      <div>
        <Header
          contacts={contacts}
          addContactHandler={addContactHandler}
          addContact={addContact}
          saveHandler={saveHandler}
          setAddContact={setAddContact}
          alert={alert}
        />
      </div>
      {!contacts.length ? (
        <ThreeDot color="#f6bc60" size="large" />
      ) : (
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
              contacts={contacts}
              contact={contacts.find(contact => contact.id === isModalId)}
              setIsModalId={setIsModalId}
              saveHandler={saveHandler}
              alert={alert}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Contacts;
