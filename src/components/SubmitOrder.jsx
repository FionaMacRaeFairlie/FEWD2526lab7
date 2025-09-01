import { useState } from "react";
import Toast from 'react-bootstrap/Toast';
const SubmitOrder = ({ selectedItems, onSendOrder }) => {

  const [nameField, setNameField] = useState("");
  const [tableField, setTableField] = useState("")
  const [message, setMessage] = useState("");

  const [showMessage, setShowMessage] = useState(false);

  const addOrder = () => {
    let newOrder = [nameField, tableField, selectedItems];
    const orderString = JSON.stringify(newOrder);
    fetch(`http://localhost:3001/addOrder`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*     ",
        "Content-Type": "application/json",
      },
      body: orderString,
    })
      .then((response) => response.json())
      .then((incomingData) => {
        console.log(incomingData)
        setMessage(incomingData.message);
        setShowMessage(true);
        setNameField("");
        setTableField("");
        onSendOrder([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <label> Enter your name:</label>
      <input
        className="form-control"
        type="text"
        placeholder="Enter your name here ..."
        id="name"
        value={nameField}
        onChange={(e) => setNameField(e.target.value)}
      />
      <label> Enter your table number :</label>
      <input
        className="form-control"
        type="text"
        placeholder="Enter your table number here ..."
        id="table"
        value={tableField}
        onChange={(e) => setTableField(e.target.value)}
      />
      <button onClick={addOrder}>Submit order</button>
      {/* <p>{message}</p> */}
      <Toast onClose={() =>
        setShowMessage(false)}
        show={showMessage}
        delay={3000}
        autohide>
        <Toast.Header>
          <strong className="me-auto">Order confirmed</strong>
        </Toast.Header>
        <Toast.Body>
          {message}
        </Toast.Body>
      </Toast>
    </div>
  );
};
export default SubmitOrder;
