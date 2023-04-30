import React from "react";

const formStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1.5px solid black",
  padding: "70px 80px 100px 80px",
  borderRadius: "30px",
};

const inputStyles = {
  marginBottom: "60px",
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  border: "1px solid grey",
  borderRadius: "5px",
};

const buttonStyles = {
  backgroundColor: "blue",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
};

function Forms(props) {
  function sendReq() {
    const address = document.getElementById("address").value;
    const message = document.getElementById("message").value;
    const amount = document.getElementById("amount").value;
    props.contract.sentRequest(address, amount, message);
  }

  return (
    <div>
      <form style={formStyles}>
        <input
          type="text"
          id="address"
          style={inputStyles}
          placeholder="Account Address"
        />
        <textarea id="message" style={inputStyles} placeholder="Message" />
        <input
          type="number"
          step="0.0001"
          id="amount"
          style={inputStyles}
          placeholder="Amount in ETH"
        />
        <button
          type="submit"
          style={buttonStyles}
          onClick={(e) => {
            e.preventDefault();
            sendReq();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Forms;
