import React, { useEffect, useState } from "react";
import "./Login.css";
import { Formik, Form } from "formik";
import { ImEye } from "react-icons/im";
import axios from "axios";

import * as Yup from "yup";
import TextField from "./TextField";
import { useNavigate } from "react-router-dom";
const CryptoJS = require("crypto-js");

const Login = () => {
  const [dec, setDec] = useState({});

  const validate = Yup.object({
    email: Yup.string()
      .email("Email is invalid!!!")
      .required("Email is required!!!"),
    password: Yup.string()
      .min(4, "Password must be at least 6 characters")
      .max(16, "Password is more 6 characters")
      .required("Password is required!!!"),
  });

  const navigate = useNavigate();

  function encryptRequest(data, key) {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      key
    ).toString();
    return encrypted;
  }

  async function makeApiRequest(email, password) {
    const apiUrl = "https://devadmin.altabooking.com/api/v2/auth/login";

    const encryptionKey = "aLtAeNCrypT";

    const requestBody = {
      email,
      password,
    };

    const encryptedRequest = encryptRequest(requestBody, encryptionKey);

    const headers = {
      apikey: "indusAltaR2PSM",
      currency:
        "U2FsdGVkX1/O0sFe9FnokQdTBRP/rRIlcPZEWbzHL9ncZwZzp/Fu/2Jnt0z8ukCA LQNDRknKwa5WdmjDRC2XA2a0gz/ZfvHeYTIq7fBZi9P4kQ7KvQYueLB2Rl4puqOTSQyBs bLGPc8cQ9KDZLMVapCruTsJcGzRnaOo1CZksLPMzmNOPqe+ePZk6UJiAUmoDS6p4JvL Cmpe0RATiqDh7g==",
    };

    const finalRequestBody = {
      request_data: encryptedRequest,
    };

    try {
      const response = await axios.post(apiUrl, finalRequestBody, { headers });

      const decryptedResponse = CryptoJS.AES.decrypt(
        response.data.response_data,
        encryptionKey
      );
      const decryptedData = JSON.parse(
        decryptedResponse.toString(CryptoJS.enc.Utf8)
      );


      if (decryptedData.res_code === 200) {
        navigate("/search-flight");
      }
      setDec(decryptedData.res_code);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <div className="wrapperL">
      <div className="boxL">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validate}
          onSubmit={async (values) => {
            try {
              const response = await makeApiRequest(
                values.email,
                values.password
              );
              const decryptedResponse = CryptoJS.AES.decrypt(
                response.data.response_data,
                "aLtAeNCrypT"
              );
              const decryptedData = JSON.parse(
                decryptedResponse.toString(CryptoJS.enc.Utf8)
              );

              setDec(decryptedData);
            } catch (error) {}
          }}
        >
          {(formik) => (
            <Form>
              <div className="mb-3 sec">
                <TextField label="Email" name="email" type="email" />
                <TextField label="Password" name="password" type="password" />
                <ImEye className="pass-eye enable1" />

                <div className="form-btnL mt-4">
                  <button className="btn1" type="submit">
                    Login
                  </button>
                  <b>Forgot Password?</b>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
