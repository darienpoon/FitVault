// ChatGPTComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png';
import gemlogo from '../assets/gemlogo.png';

const ChatGPT = ({closetData}) => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [chatIsLoading, setChatIsLoading] = useState(false);
  const [chatError, setChatError] = useState(false);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (!message.trim()) {
      // If the input is empty or contains only whitespace, do not proceed
      window.alert('Please enter valid text')
      return;
    }
    console.log('closetData:', closetData);
    setChatIsLoading(true)

    const cleanClosetData = closetData.map(({ photos, ...rest }) => rest);


    // Send the user input server for processing
    axios // closetData
      .post('http://localhost:3001/api/chat', { message, cleanClosetData })
      .then((res) => {
        setResponse(res.data.response);
        setChatIsLoading(false)
      })
      .catch((error) => {
        console.error('Error while getting ChatGPT response:', error);
        setResponse('Error fetching response');
        setChatIsLoading(false)
        setChatError(true)
      });
  };

  return (
    <div className="chat">
      <input
        type="text"
        id="chatSearch"
        value={message}
        onChange={handleChange}
        placeholder="Ask VAULT a question... "
        required
      />
      <button onClick={handleSubmit}>ASK</button>
      {chatError ? (
        <h3> Sorry, Vault cannot complete the search, please try again...</h3>
      ):

      chatIsLoading ? ( <>
        <a href="http://localhost:3000/" target="_blank">
        <img src={logo} className="logo react" alt="Main logo" />
      </a> <h4>VAULT is brainstorming...</h4> </>
      ) : (
        response && ( // Added the conditional check
          <div className="chatResponse">
            <button id="chatHead">VAULT:</button>
            <div className="chatResponse">{response}</div>
          </div>
        )
      )}
    </div>
  );
};

export default ChatGPT;
