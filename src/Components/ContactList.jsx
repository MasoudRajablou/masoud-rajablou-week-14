import ContactCard from "./ContactCard";

function ContactList({
  contact,
  optionHandler,
  isOpenId,
  editHandler,
  deleteHandler,
  selected,
  selectBox,
  selectHandler,
}) {
  return (
    <>
      <ContactCard
        contact={contact}
        optionHandler={optionHandler}
        isOpenId={isOpenId}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        selected={selected}
        selectBox={selectBox}
        selectHandler={selectHandler}
      />
    </>
  );
}

export default ContactList;
