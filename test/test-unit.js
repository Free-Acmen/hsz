var random = require('../lib/random');
var expect = require('chai').expect;

suite('Random test', function() {
    test('random() should return a string', function() {
        expect(typeof random.getRandom() === 'string');
    });
});

// function add(a, b) {
//     return a + b;
// }

// describe('加法函数的测试', function() {
//     it('1 加 1 应该等于 2', function() {
//         expect(add(1, 1)).to.be.equal(2);
//     });
// });