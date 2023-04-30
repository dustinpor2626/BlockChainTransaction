import React, { useEffect, useState } from "react";
import Forms from "./Forms";
import { ethers } from "ethers";

function Tab(Props) {
  const [activeTab, setActiveTab] = useState(1);
  const [list, setList] = useState([]);
  const contract = Props.contract;

  useEffect(() => {
    const data = async () => {
      await contract.getReceivedReq().then((response) => {
        console.log(response);
        setList(response);
      });
    };
    contract && data();
  }, [contract]);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const tabStyles = {
    display: "flex",
    height: "50px",
    backgroundColor: "lightgrey",
    paddingTop: "10px",
  };

  const tabItemStyles1 = {
    listStyle: "none",
    padding: "10px 30px 10px 30px",
    marginRight: "30px",
    cursor: "pointer",
    backgroundColor: activeTab === 1 ? "white" : "lightgrey",
    borderRadius: "10px 10px 0 0",
  };

  const tabItemStyles2 = {
    listStyle: "none",
    padding: "10px 30px 10px 30px",
    cursor: "pointer",
    backgroundColor: activeTab === 1 ? "lightgrey" : "white",
    borderRadius: "10px 10px 0 0",
  };

  const tabContentStyles = {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "0 0 10px 10px",
    height: "80vh",
    overflow: "auto",
  };

  const buttonStyle = {
    width: "150px",
    height: "40px",
    marginTop: "20px",
    marginLeft: "300px",
    borderRadius: "20px",
    backgroundColor: "wheat",
  };

  const container = {
    border: "2px solid gray",
    borderRadius: "20px",
    padding: "20px",
    margin: "20px",
  };

  const ReqList = list.map((item, index) => (
    <div style={container} key={index}>
      <h3>FROM : {item._address}</h3>
      <h3>MESSAGE : {item.message}</h3>
      <div style={{ display: "flex" }}>
        <h1>AMOUNT : {Number(item.amount)} ETH</h1>{" "}
        <button
          style={buttonStyle}
          onClick={() =>
            Props.contract.payReq(index, {
              value: ethers.utils.parseEther(item.amount.toString()),
            })
          }
        >
          Confirm
        </button>
      </div>
    </div>
  ));

  return (
    <div style={{ marginTop: "-16px" }}>
      <ul style={tabStyles}>
        <li style={tabItemStyles1} onClick={() => handleTabClick(1)}>
          Sent Request
        </li>
        <li style={tabItemStyles2} onClick={() => handleTabClick(2)}>
          Received Request
        </li>
      </ul>
      {activeTab === 1 && (
        <div style={tabContentStyles}>
          <Forms contract={Props.contract} />
        </div>
      )}
      {activeTab === 2 && <div style={tabContentStyles}>{ReqList}</div>}
    </div>
  );
}

export default Tab;
