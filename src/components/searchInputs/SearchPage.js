import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "../searchInputs/SearchPage.css";
import SearchTextField from "./SearchTextField";
import { TbArrowsExchange } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import Test from './text'

import axios from "axios";
import Navbar from "../Navbar";

const CryptoJS = require("crypto-js");

const SearchPage = () => {

  const validate = Yup.object({
    // flyingFrom: Yup.string().required("Flying Form is required!!!"),
    // flyingTo: Yup.string().required("Flying Form is required!!!"),
    // departure: Yup.string().required("Flying Form is required!!!"),
    // class: Yup.string().required("Preferred Class is required!!!"),
  });



  function encryptRequest(data, key) {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      key
    ).toString();
    return encrypted;
  }

  async function makeApiRequest(departure, to) {
    function encryptRequest(data, key) {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
      return encrypted;
    }
  
    async function makeApiRequest(from, to) {
      const apiUrl = 'https://devadmin.altabooking.com/api/v2/flight/flight-search-list';
      const encryptionKey = 'aLtAeNCrypT';
  
      const requestBody = {
        from_airport: { from },
        to_airport: { to },
        departure_date: '2023-12-30',
        return_date: '2023-12-30',
        adults: '1',
        childs: '',
        infants: '',
        class_type: 'Economy',
        travel_type: 'oneway',
        max_result: 100,
        user_id: 0,
        preferred_class: 'Economy',
      };
  
      const encryptedRequest = encryptRequest(requestBody, encryptionKey);
  
      const headers = {
        'apikey': 'indusAltaR2PSM',
        'currency': 'U2FsdGVkX1/O0sFe9FnokQdTBRP/rRIlcPZEWbzHL9ncZwZzp/Fu/2Jnt0z8ukCA LQNDRknKwa5WdmjDRC2XA2a0gz/ZfvHeYTIq7fBZi9P4kQ7KvQYueLB2Rl4puqOTSQyBs bLGPc8cQ9KDZLMVapCruTsJcGzRnaOo1CZksLPMzmNOPqe+ePZk6UJiAUmoDS6p4JvL Cmpe0RATiqDh7g==',
      };
  
      const finalRequestBody = {
        request_data: encryptedRequest,
      };
  
      try {
        const response = await axios.post(apiUrl, finalRequestBody, { headers });
  
        const decryptedResponse = CryptoJS.AES.decrypt(response.data.response_data, encryptionKey);
        const decryptedData = JSON.parse(decryptedResponse.toString(CryptoJS.enc.Utf8));
  
        console.log('Decrypted Response:', decryptedData);
  
        if (decryptedData.res_code === 201) {
          // console.log('Successful response:', decryptedData.response);
        } else {
          // console.error('Unexpected response:', decryptedData.response);
          // console.error('Server message:', decryptedData.server_message);
        }
      } catch (error) {
      //   console.error('Error:', error.message);
      }
    }
  
    
  }
  useEffect(() => {
    makeApiRequest('london', 'kolkata');
  }, []);

  return (
    <>
      <div className="container">
        <Navbar/>
      </div>

      <div className="trips">
        <button className="trip one">One way</button>
        <button className="trip">Round Trip</button>
        <button className="trip">Multi-City</button>
      </div>

      <div className="wrapper">
        <div className="box">
          <Formik
            initialValues={{
              from: "",
              to: "",
              departure: "",
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
              console.log(values);

              try {
                const response = await makeApiRequest(values.from, values.to);
                // console.log(response);

                const decryptedResponse = CryptoJS.AES.decrypt(
                  response.data.response_data,
                  "aLtAeNCrypT"
                );
                const decryptedData = JSON.parse(
                  decryptedResponse.toString(CryptoJS.enc.Utf8)
                );

                // console.log("Decrypted Response:", decryptedData);

              } catch (error) {
                // console.error("Error:", error.message);
              }
            }}
          >
            {(formik) => (
              <Form>
                <div className="all">
                  <div className="mini inputL">
                    <SearchTextField
                      label="Flying From"
                      name="from"
                      type="text"
                      className="inputL"
                    />
                    <IoLocationOutline className="loc" />
                  </div>
                  <TbArrowsExchange className="ex" />
                  <div className="mini inputL">
                    <SearchTextField
                      label="Flying To"
                      name="to"
                      type="text"
                      className="inputL"
                    />
                    <IoLocationOutline className="loc" />
                  </div>
                  <div className="mini inputL">
                    <SearchTextField
                      label="Departure Date"
                      name="departure"
                      type="date"
                      className="inputL"
                    />
                  </div>
                  <div className="mini inputL">
                    <SearchTextField
                      label="Traveller(s)"
                      name="traveller"
                      type="text"
                      className="inputL"
                    />
                  </div>
                  <div className="mini pref">
                    <label>Preferred Class:</label>
                    <select name="preferredClass">
                      <option value="Economy">Preferred Class</option>
                      <option value="Economy">Economy</option>
                      <option value="Premium Economy">Premium Economy</option>
                      <option value="Business">Business</option>
                      <option value="First">First</option>
                    </select>
                  </div>
                </div>
                <div className="form-btn mt-4">
                  <button className="btn2" type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <Test/>
      </div>
    </>
  );
};

export default SearchPage;
