import React from "react";

const SelectInput = ({
  name,
  options,
  defaultOption,
  label,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-control"
        name={name}
        onChange={onChange}
        value={value}
      >
        <option value="">{defaultOption}</option>
        {options.map((optionItem) => {
          return (
            <option key={optionItem.value} value={optionItem.value}>
              {optionItem.text}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectInput;
