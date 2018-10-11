pragma solidity ^0.4.23;
contract TransferEther {
   
  function Transfer(address _to) public payable { 
    _to.transfer(msg.value);
   
  }
  
  function getBalance(address _of) public view returns (uint256 _value) {
    return _of.balance;
  }
  
  struct user{
    string docHash;
  }
  
  mapping(address => user) public name ;
  
  function store(string _docs){
    name[msg.sender].docHash =_docs;
     }
  
  function getDocs() public constant returns (string doc){
    return(name[msg.sender].docHash);
  }
  
}