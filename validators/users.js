const implicitRules = [
  'required',
  'requiredIf',
  'requiredNotIf',
  'requiredWith',
  'requiredWithout',
  'accepted',
  'sometimes',
  'nullable',
];
class UsersValidator {
        /**
         * [constructor description]
         *
         * @param     {[type]}    inputs              {name:'123',password:'123123'}
         * @param     {[type]}    validationsRules    {name1: 'required|maxLength:8',password1: 'required|maxLength:20',email1: 'required|email'}
         *
         */
    constructor(inputs = {}, validationsRules = {}) {
        // inputs collection
        this.inputs = inputs;
        // parse validations collection, this should be after all assignments
        this.parseRules(validationsRules);
    }
    parseRules(validationRule = {
        name1: 'required|maxLength:8',
        password1: 'required|maxLength:20',
        email1: 'required|email',
    }) {
        // 总规则
        this.validationRules = {};
        // attributes in rules
        const attrs = Object.keys(validationRules);
        //attrs=['name1','password1',email1];
        attrs.forEach((attr) => {
            //是数组继续循环
            if (attr === '*') {
                this.addPostRules(validationRules[attr].split('|'));
                return;
            }

            // strRules=required|maxLength:8
            const strRules = validationRules[attr];
            
            // rule blueprint
            // attRule={name:name1,name1,value:null,rules:[],nullable:false}
            const attrRule = {
                name: attr,
                attr,
                value: null,
                rules: [],
                nullable: false,
            };
            //reluseArray="required|maxLength:8"
            let rulesArray = strRules;
            // if array of rules
            if (!Array.isArray(rulesArray)) {
                //不是数组
                // get array of rules from string
                rulesArray = (strRules || '').toString()
                    .split('|');
            }
            //rulesArray=["required","maxLength:8"];
            // set rules of attribute
            //总规则库 [name1]={name:name1,name1,value:null,rules:[],nullable:false}
            this.validationRules[attr] = attrRule;

            // parse array of string rules
            rulesArray.forEach((rule) => {
                // split by colon to get rule name and args
                let ruleName;
                let argsStr;
                if (Array.isArray(rule)) {
                    [ruleName, ...argsStr] = rule;
                } else if (rule.indexOf(':') !== -1) {
                    //ruleName=maxLength
                    //argsStr=8
                    [ruleName, argsStr] = rule.split(':');
                } else {
                    ruleName = rule;
                }
                // if rule is nullable
                if (ruleName === 'nullable') {
                    attrRule.nullable = true;
                }

                // parse rule object with name and args
                let parsedRule;

                // if args exists
                if (typeof argsStr !== 'undefined') {
                    const ruleArgs = Array.isArray(argsStr) ? argsStr : argsStr.split(',');
                    parsedRule = { rule: ruleName, args: ruleArgs };
                } else {
                    // in case of no arguments
                    parsedRule = { rule: ruleName, args: [] };
                }

                // if rule has greater priority over
                if (implicitRules.indexOf(ruleName) >= 0) {
                    attrRule.rules.unshift(parsedRule);
                    attrRule.required = true;
                } else {
                    attrRule.rules.push(parsedRule);
                }
            });
            // set parse rules of attribute
            this.validationRules[attr] = attrRule;
        });
    }

}
exports = module.exports = UsersValidator;