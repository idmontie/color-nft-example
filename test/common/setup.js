const chai = require('chai');
const BN = require('bn.js');

before(() => {
    chai.use(require('chai-as-promised')).should();
    chai.use(require('chai-bn')(BN));
});
