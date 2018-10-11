var host_input = require('./inputdata/blockChain.json');
require('dotenv').load();
var appUrl = process.env.ETH_APP_URL;
describe('Login', function() {
    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get(appUrl);
    });
     it('As a user He/She should add ether', function() {
        var bkChain = require('../actions/blockChainActions.js');
        var expectChain = require('../page/blockChainPage.js');
        bkChain.fromAddress(host_input.blockChain.fromAddress);
        bkChain.toAddress(host_input.blockChain.toAddress);
        bkChain.transfer();
        expect(expectChain.status.isDisplayed()).toBe(true);
    });
    it('As a user He/She can check their ether balance', function () {
        var bkChain = require('../actions/blockChainActions.js');
        var expectChain = require('../page/blockChainPage.js');
        bkChain.address(host_input.blockChain.fromAddress);
        bkChain.getBalance();
        expect(expectChain.etherBalance.isDisplayed()).toBe(true);
    });
});