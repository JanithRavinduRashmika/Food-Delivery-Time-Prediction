import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function DropdownButton() {
  const [selectedValue, setSelectedValue] = useState("2024");

  const handleOptionSelect = (value) => {
    setSelectedValue(value);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success">
        {selectedValue}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleOptionSelect("2024")}>2024</Dropdown.Item>
        <Dropdown.Item onClick={() => handleOptionSelect("2023")}>2023</Dropdown.Item>
        <Dropdown.Item onClick={() => handleOptionSelect("2022")}>2022</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownButton;
