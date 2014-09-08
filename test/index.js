var test = require('grape'),
    ieify = require('../');

test('basic keyword fix', function(t){
    t.plan(1);

    var code = 'var x = {}; x.switch = 5;';

    t.equal(ieify(code), 'var x = {}; x["switch"] = 5;');
});

test('multiple keyword fixes', function(t){
    t.plan(1);

    var code = 'var x = {"switch":{}}; x.switch.in = 5;';

    t.equal(ieify(code), 'var x = {"switch":{}}; x["switch"]["in"] = 5;');
});

test('Object notation fixes', function(t){
    t.plan(1);

    var code = 'var x = {switch: 5}';

    t.equal(ieify(code), 'var x = {"switch": 5}');
});

test('Object notation fixes', function(t){
    t.plan(1);

    var code = 'var x = {class: 5}';

    t.equal(ieify(code), 'var x = {"class": 5}');
});

test('Object notation doesnt fix if it doesnt need to', function(t){
    t.plan(1);

    var code = 'var x = {thing: 5}';

    t.equal(ieify(code), 'var x = {thing: 5}');
});