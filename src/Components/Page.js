import Tab from "./Tab.js";
import React, { useEffect, useState } from "react";

function Page(props) {
  const [list, setList] = useState([]);
  const contract = props.contract;

  useEffect(() => {
    const data = async () => {
      await contract.getTransactions().then((response) => {
        console.log(response);
        setList(response);
      });
    };
    contract && data();
  }, [contract]);

  const table = {
    borderCollapse: "separate",
    padding: "1px 10px 1px 10px",
    marginTop: "5px",
    border: "1px solid lightgrey",
    width: "100%",
  };

  const tdStyle = {
    padding: "4px 7px 4px 7px",
  };

  const TransList = list.map((item, index) => (
    <div key={index}>
      <table
        style={{
          ...table,
          backgroundColor: item.sign == "-" ? "lightpink" : "lightgreen",
        }}
      >
        <tr>
          <td style={tdStyle}>{item._address.trim()}</td>
          <td style={tdStyle}>{item.message}</td>
          <td style={tdStyle}>
            {item.sign == "-" ? "-" : "+"}
            {Number(item.amount)} ETH
          </td>
        </tr>
      </table>
    </div>
  ));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          width: "100hh",
        }}
      >
        <div style={{ flex: 1, backgroundColor: "white" }}>
          <Tab contract={props.contract} />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              height: "55px",
              backgroundColor: "lightgrey",
              marginBottom: "20px",
              paddingTop: "5px",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <h2>Transaction History</h2>
          </div>
          <div style={{ height: "75vh", overflow: "auto", margin: "20px" }}>
            {TransList}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", backgroundColor: "wheat", height: "7vh" }}>
        <h3>Connected Address : {props.accounts}</h3>
      </div>
    </div>
  );
}

export default Page;
