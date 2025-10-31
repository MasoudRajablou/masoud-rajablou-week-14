import ContactCard from "./ContactCard";

function ContactList({
  contact,
  optionHandler,
  isOpenId,
  editHandler,
  deleteHandler,
}) {
  return (
    <>
      <ContactCard
        contact={contact}
        optionHandler={optionHandler}
        isOpenId={isOpenId}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </>
  );
}

export default ContactList;
