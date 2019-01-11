let Handlebars = require('handlebars');

Handlebars.registerHelper('is', function(actual, expected, options) {
	if (actual === expected) {
		return options.fn(this)
	} else {
		return options.inverse(this)
	}
})

let checkCondition = function(v1, operator, v2) {
    switch(operator) {
        case '==':
            return (v1 == v2);
        case '===':
            return (v1 === v2);
        case '!==':
            return (v1 !== v2);
        case '<':
            return (v1 < v2);
        case '<=':
            return (v1 <= v2);
        case '>':
            return (v1 > v2);
        case '>=':
            return (v1 >= v2);
        case '&&':
            return (v1 && v2);
        case '||':
            return (v1 || v2);
        default:
            return false;
    }
}
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    return checkCondition(v1, operator, v2)
                ? options.fn(this)
                : options.inverse(this);
});
