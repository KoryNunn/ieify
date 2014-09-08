# ieify

If you do something like this in a browser or node:

```javascript
var x = {};

x.case = 'things';
```

It will work.

However in many versions of internet explorer, it will error, with ```Unexpected identifier```
which is obviously because you used a reserved keyword.

ieify is a module that takes perfectly valid code, and makes it even more valider for syntactically challenged environments such as internet explorer.

## Usage:

```
npm install ieify
```

```javascript
var ieify = require('ieify');

var someCode = "var x = {class:'foo'}; x.switch = 'bar';"

ieify(someCode)
// -> var x = {"class":'foo'}; x["switch"] = 'bar';