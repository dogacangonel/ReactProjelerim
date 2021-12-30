import React from "react";
//Diğer component rahatlıkla kullanabilceğimiz kolay toolboxlarımı kendimiz oluşturuyoruz.
//Bunlar form işlemlerinde işimize yarayacaktır.
const TextInput = ({ name, value, placeholder, error, label, onChange }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
        {/* Bu eğer error varsa hemen yanındaki div çalıştır demektir. Bu syntax javaScriptten gelmektedir. */}
      </div>
    </div>
  );
};

export default TextInput;
