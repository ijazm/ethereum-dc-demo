exports.config = {
  directConnect: true,
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
    args: ["--headless", "--disable-gpu", "--window-size=800x600"]
    }
  },
  framework: 'jasmine',
  onPrepare: function () {
  var AllureReporter = require('../node_modules/jasmine-allure-reporter');
  jasmine.getEnv().addReporter(new AllureReporter({
  resultsDir: 'allure-results'
  }));
  },
  specs: [
        '../testcases/blockChainTest.js' 
      ],

  jasmineNodeOpts: {
    defaultTimeoutInterval: 500000
  }
};
