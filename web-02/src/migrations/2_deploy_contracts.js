var TransferEther = artifacts.require('./TransferEther.sol')
module.exports = function (deployer) {
  deployer.deploy(TransferEther);
  
}
