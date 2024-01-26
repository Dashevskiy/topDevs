import { useState } from "react";
import './index.css';

function Dropdown({ selected, setSelected, handleChange }) {
  const [isActive, setIsActive] = useState(false);
  const options = ["title", "author", "rate"];

  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={() => setIsActive(!isActive)}>
        {selected}
        <span className={`${isActive ? 'triangle-top' : 'triangle-bottom'}`}></span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div key={option}
              onClick={() => {
                handleChange(option)
                setSelected(option);
                setIsActive(false);
              }}
              className={`dropdown-item ${selected === option ? 'active' : ''}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
