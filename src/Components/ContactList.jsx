import ContactCard from "./ContactCard";

function ContactList({ contact, optionHandler }) {
  return (
    <>
      <ContactCard contact={contact} optionHandler={optionHandler} />
    </>
  );
}

export default ContactList;
