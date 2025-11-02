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
  const [modalId, setModalId] = useState(null);
  const [isModal, setIsModal] = useState(false);
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
        contact.firstName.toLowerCase().trim().includes(search) ||
        contact.lastName.toLowerCase().trim().includes(search) ||
        contact.phone.toString().includes(search) ||
        contact.email.toLowerCase().trim().includes(search)
    );

    search ? setContacts(newContacts) : setContacts(originalContacts);
  }, [search]);

  useEffect(() => {
    document.body.style.overflow = isModal ? "hidden" : "auto";
  }, [modalId, addContact]);

  const optionHandler = id => {
    setIsOpenId(id);
  };

  const editHandler = id => {
    setModalId(id);
    setIsModal(true);
  };

  const deleteHandler = id => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
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
    setIsModal(false);

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

      setModalId(null);
      setContacts(updatedContact);
      setOriginalContacts(updatedContact);
      showMessage("The contact is updated!");
    } else {
      setContacts([
        ...originalContacts,
        {
          id: id,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: email,
        },
      ]);
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
    setIsModal(true);
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
    !selected.length
      ? setSelected(contacts.map(contact => contact.id))
      : setSelected([]);
  };

  const deleteSelectedHandler = () => {
    const newContacts = contacts.filter(
      contact => !selected.includes(contact.id)
    );
    setContacts(newContacts);
    setOriginalContacts(newContacts);
    setSelected([]);
    setLoading(true);
    setSelectBox(false);

    newContacts.length === 0
      ? showMessage("All contacts are deleted")
      : showMessage("Selected contacts are deleted");
  };

  const modalCancelHandler = () => {
    setAddContact(false);
    setModalId(null);
    setIsModal(false);
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
          modalCancelHandler={modalCancelHandler}
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
              checked={selected.length && selected.length === contacts.length}
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

      {!contacts.length ? (
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
                modalId={modalId}
                selected={selected}
                selectBox={selectBox}
                selectHandler={selectHandler}
              />
            ))}
          </ul>

          {!!modalId && (
            <Modal
              originalContacts={originalContacts}
              contact={contacts.find(contact => contact.id === modalId)}
              modalCancelHandler={modalCancelHandler}
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
