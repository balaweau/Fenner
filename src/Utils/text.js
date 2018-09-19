
//convert camel-cased strings to title case, esp db fields.
export const titleCase = (input) => {
  let str = input;
  let result = str.replace(/^\s*/, '').replace(/^[a-z]|[^\s][A-Z]/g, function(str, idx) {
    return(idx === 0) ? str.toUpperCase() : `${str.substr(0,1)} ${str.substr(1).toUpperCase()}`;
  });
  return result;
}

export const hasData = (obj) => {
  if(typeof(obj) === 'object' || typeof(obj) === 'undefined')
    return Object.keys(obj || {}).length > 0;
  else
    return String(obj).trim().length > 0;
  }

  //pure
  export const asArray = (data) => {
    return (!hasData(data)) ? [] : (Array.isArray(data)) ? data : [...data];
  };

  //pure
  export const isObject = (data) => {
    return data instanceof Object && data.constructor === Object;
  };

  export const getEndpoint  = (str) => {
    return titleCase(str.split('/').pop());
  }
