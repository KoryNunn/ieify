var test = require('grape'),
    ieify = require('../'),
    Stream = require('stream');

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

test('returns a stream', function(t){
    t.plan(1);
    t.ok(ieify() instanceof Stream, '');
});

test('works with streams', function(t){
    t.plan(1);

    var dataStream = new Stream(),
        code = 'var x = {delete: 5}';

    dataStream.pipe(ieify()).on('data', function(data){
        t.equal(data, 'var x = {"delete": 5}', 'got correct output');
    });

    dataStream.emit('data', code);
    dataStream.emit('end');
});