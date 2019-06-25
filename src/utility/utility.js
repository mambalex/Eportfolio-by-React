export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = ( value, rules ) => {
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }

    return isValid;
}

// search the CSSOM  rule   //change("skill-1", "20%");
function findKeyframesRule(rule) {
    // gather all stylesheets into an array
    var ss = document.styleSheets;
    // loop through the stylesheets
    for (var i = 0; i < ss.length; ++i) {
        try {
            var rules = ss[i].rules || ss[i].cssRules;
        } catch (e) {
            console.warn("Can't read the css rules of: " + ss[i].href, e);
            continue;
        }
        if (rules) {
            // loop through all the rules
            for (var j = 0; j < ss[i].cssRules.length; ++j) {
                // find therule whose name matches our passed over parameter and return that rule
                if (ss[i].cssRules[j].type == window.CSSRule.KEYFRAMES_RULE && ss[i].cssRules[j].name == rule)
                    return ss[i].cssRules[j];
            }}
    }
    return null;
}

// remove old keyframes and add new ones
export const changeCSSPercent = (anim, percent) =>
{
    var keyframes = findKeyframesRule(anim);
    keyframes.deleteRule("100%");
    keyframes.appendRule(`100%{width: ${percent};}`);
}


