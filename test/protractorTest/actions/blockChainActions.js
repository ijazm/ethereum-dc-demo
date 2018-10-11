
var blockChain = function() {
    var blockC = require('../page/blockChainPage.js');

    this.fromAddress = function (value) {
        blockC.fromAddress.sendKeys(value);
    };
	this.toAddress = function (value) {
        blockC.toAddress.sendKeys(value);
    };
	this.address = function (value) {
        blockC.address.sendKeys(value);
    };
	this.transfer = function () {
        blockC.transfer.click();
    };
    this.getBalance = function () {
        blockC.getBalance.click();
    };
	
};
module.exports = new blockChain();
	