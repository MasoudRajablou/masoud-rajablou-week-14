import { MdOutlineAddBox, MdSelectAll } from "react-icons/md";

function Header() {
  return (
    <div>
      <h1>Contact List</h1>
      <input type="text" placeholder="Search name, number or mail" />
      <button>
        <MdSelectAll />
      </button>
      <button>
        <MdOutlineAddBox />
      </button>
    </div>
  );
}

export default Header;
