import React, { useEffect } from 'react';
import axios from 'axios';
const CryptoJS = require('crypto-js');

const Text = () => {
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

  useEffect(() => {
    makeApiRequest('london', 'kolkata');
  }, []);

  return (
    <div>text</div>
  );
};

export default Text;
