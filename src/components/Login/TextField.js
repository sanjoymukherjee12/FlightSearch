import React from "react";
import { ErrorMessage, useField } from "formik";
import './Login.css'


const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="poL" >
        <label htmlFor={field.name} className="form-label">
          {label}
        </label>
        <input
          className={`form-control ${meta.touched && meta.error}`}
          {...field} {...props}
          autoComplete="off"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          
        />
        <ErrorMessage component="div" name={field.name} className="error"/>
        <br/>
  </div>
      
  );
};

export default TextField;
