var recast = require('recast'),
    through = require('through'),
    keywords = [
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar
        'break',
        'case',
        'class',
        'catch',
        'const',
        'continue',
        'debugger',
        'default',
        'delete',
        'do',
        'else',
        'export',
        'extends',
        'finally',
        'for',
        'function',
        'if',
        'import',
        'in',
        'instanceof',
        'let',
        'new',
        'null',
        'return',
        'super',
        'switch',
        'this',
        'throw',
        'try',
        'typeof',
        'var',
        'void',
        'while',
        'with',
        'yield'
    ];

function scanForKeywords(node){
    for(var key in node){
        var obj = node[key];


        if(!obj || typeof obj !== 'object'){
            continue;
        }

        if(obj.type === 'Identifier'){
            if(~keywords.indexOf(obj.name)){
                obj.type = 'Literal';
                obj.raw = '"' + obj.name + '"';
                obj.value = obj.name;
                delete obj.name;
                node.computed = true;
            }
            continue;
        }

        scanForKeywords(obj);
    }
}

function ieify(code){
    var ast = recast.parse(code);

    scanForKeywords(ast.program.body);

    return recast.print(ast).code;
}

module.exports = function(code){
    if(arguments.length === 0){
        code = '';

        return through(function(chunk) {
               code += chunk.toString();
            },
            function() {
               this.queue(ieify(code));
               this.queue(null);
            }
        );
    }

    return ieify(code);
};
