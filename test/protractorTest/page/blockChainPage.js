var blockChain = {
    fromAddress: element(by.id('From')),
    toAddress: element(by.id('To')),
    transactionHash: element(by.id('tx')),
    ether: element(by.id('value')),
    gasUsed: element(by.id('gas')),
    status: element(by.id('status')),
    address: element(by.id('user')),
    transfer: element(by.id('send')),
    getBalance: element(by.id('send1')),
    etherBalance: element(by.id('result'))
};
module.exports = blockChain;