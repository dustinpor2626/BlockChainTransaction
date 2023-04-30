// SPDX-License-Identifier: SEE LICENSE IN LICENSE
//npx hardhat compile
pragma solidity ^0.8.9;

struct Request_received {
    string message;
    uint  amount;
    address  _address;
}   

struct Transaction{
    address _address;
    uint amount;
    string message;
    string sign;
}

contract MyTest{
    mapping (address => Request_received[]) receivedReq;
    mapping (address => Transaction[]) transactions;

    function getReceivedReq() public view returns(Request_received[] memory){
        return receivedReq[msg.sender];
    }


    function sentRequest(address _address,uint _amount,string memory _message) external{
        Request_received memory _receivedReq = Request_received(_message,_amount,msg.sender);
        receivedReq[_address].push(_receivedReq);
    }


    function getTransactions() external  view returns(Transaction[] memory){
        return transactions[msg.sender];
    }


    function payReq(uint _indx) external payable{
        uint lock =0;
        require(lock == 0,"Wait for Process to complete");
        lock = 1;
        Request_received memory _receivedReq = receivedReq[msg.sender][_indx];

        require(_receivedReq.amount > 0,"Amount must be greaater than zero");
        require(msg.sender.balance >= _receivedReq.amount,"Your Balance is not enough");

        address payable recipient = payable(_receivedReq._address);
        recipient.transfer(msg.value);
        Transaction memory _transactionSend = Transaction(_receivedReq._address,_receivedReq.amount,_receivedReq.message,"-");
        transactions[msg.sender].push(_transactionSend);

        Transaction memory _transactionRec = Transaction(msg.sender,_receivedReq.amount,_receivedReq.message,"+");
        transactions[_receivedReq._address].push(_transactionRec);

        uint len = receivedReq[msg.sender].length;
        receivedReq[msg.sender][_indx] = receivedReq[msg.sender][len-1];
        receivedReq[msg.sender].pop();
        lock = 0;
    }

}