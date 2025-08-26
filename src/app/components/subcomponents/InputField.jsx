// InputField.jsx
import React from "react";

const InputField = ({ formik, type, name, label, maxLength }) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block">{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        maxLength={maxLength}
        className="w-full p-2 border border-[#8E8989] rounded text-black bg-white"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default InputField;
