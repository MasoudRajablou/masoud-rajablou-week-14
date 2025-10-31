import { useEffect, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import { MdOutlineCancel, MdOutlineDeleteForever } from "react-icons/md";

import Header from "./Header";
import ContactList from "./ContactList";
import Modal from "./Modal";
import Message from "./Message";

import styles from "../modules/Contacts.module.css";

function Contacts() {
  const [originalContacts, setOriginalContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenId, setIsOpenId] = useState(null);
  const [isModalId, setIsModalId] = useState(null);
  const [addContact, setAddContact] = useState(false);
  const [alert, setAlert] = useState("");
  const [msg, setMsg] = useState("");
  const [selected, setSelected] = useState([]);
  const [selectBox, setSelectBox] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/MOCK_DATA.json");
        const json = await res.json();
        setOriginalContacts(json);
        setContacts(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const newContacts = originalContacts.filter(
      contact =>
        contact.firstName.includes(search) ||
        contact.lastName.includes(search) ||
        contact.phone.toString().includes(search) ||
        contact.email.includes(search)
    );

    search ? setContacts(newContacts) : setContacts(originalContacts);
  }, [search]);

  const optionHandler = id => {
    setIsOpenId(id);
  };

  const editHandler = id => {
    setIsModalId(id);
  };

  const deleteHandler = id => {
    const newContacts = originalContacts.filter(contact => contact.id !== id);
    setOriginalContacts(newContacts);
    showMessage("Contact is deleted.");
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
      const updatedContact = originalContacts.map(contact => {
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
      setOriginalContacts(updatedContact);
      showMessage("The contact is updated!");
    } else {
      setOriginalContacts([
        ...originalContacts,
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

  const addContactHandler = () => {
    setAddContact(true);
  };

  const showMessage = message => {
    setMsg(message);

    setTimeout(() => {
      setMsg("");
    }, 3000);
  };

  const selectBtnHandler = () => {
    setSelectBox(selectBox => !selectBox);
    setSelected([]);
  };

  const selectHandler = id => {
    setSelected(selected =>
      selected.includes(id)
        ? selected.filter(select => select !== id)
        : [...selected, id]
    );
  };

  const selectAllHandler = () => {
    setSelected(originalContacts.map(contact => contact.id));
  };

  const deleteSelectedHandler = () => {
    const newContacts = originalContacts.filter(
      contact => !selected.includes(contact.id)
    );
    setOriginalContacts(newContacts);
    setSelected([]);
    setLoading(true);
    setSelectBox(false);

    newContacts.length === 0
      ? showMessage("All contacts are deleted")
      : showMessage("Selected contacts are deleted");
  };

  return (
    <>
      <>{msg && <Message msg={msg} />}</>
      <div>
        <Header
          originalContacts={originalContacts}
          addContactHandler={addContactHandler}
          addContact={addContact}
          saveHandler={saveHandler}
          setAddContact={setAddContact}
          alert={alert}
          selectBtnHandler={selectBtnHandler}
          setSearch={setSearch}
        />
      </div>

      {selectBox && (
        <div className={styles.select}>
          <label>
            <input
              type="checkbox"
              checked={
                selected.length && selected.length === originalContacts.length
              }
              disabled={!originalContacts.length}
              onChange={selectAllHandler}
            />
            <p>Select All</p>
          </label>
          <button title="Delete" onClick={deleteSelectedHandler}>
            <MdOutlineDeleteForever />
          </button>
          <button
            title="Cancel"
            onClick={() => {
              setSelectBox(selectBox => !selectBox);
              setSelected([]);
            }}
          >
            <MdOutlineCancel />
          </button>
        </div>
      )}

      {!originalContacts.length ? (
        !loading ? (
          <ThreeDot color="#f6bc60" size="large" />
        ) : (
          <h3>There is no contact to show!!</h3>
        )
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
                selected={selected}
                selectBox={selectBox}
                selectHandler={selectHandler}
              />
            ))}
          </ul>

          {!!isModalId && (
            <Modal
              orginalContacts={originalContacts}
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
