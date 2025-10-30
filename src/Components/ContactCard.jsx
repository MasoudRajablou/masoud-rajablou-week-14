import { MdOutlineMailOutline, MdOutlinePhoneAndroid } from "react-icons/md";

import styles from "../modules/ContactCard.module.css";
import { VscThreeBars } from "react-icons/vsc";

function ContactCard({
  contact: { id, firstName, lastName, email, phone },
  optionHandler,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const optionHandler = () => {
    setIsOpen(isOpen => !isOpen);
  };
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
      <button onMouseEnter={optionHandler} onMouseLeave={optionHandler}>
        <VscThreeBars />
        {isOpen && (
          <ul>
            <li>
              <button>Edit</button>
              <button>Delete</button>
            </li>
          </ul>
        )}
      </button>
    </li>
  );
}

export default ContactCard;
