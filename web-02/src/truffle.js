// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    ganache: {
      host: 'eth-02',
      port: '8545',
      network_id:'*' // Match any network id
    }
  }
}
