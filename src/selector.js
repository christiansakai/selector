var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];
  
  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // your code here
  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements

  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag
//
var selectorTypeMatcher = function(selector) {
  // your code here
};

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    // define matchFunction for id

  } else if (selectorType === "class") {
    // define matchFunction for class
    
  } else if (selectorType === "tag.class") {
    // define matchFunction for tag.class
    
  } else if (selectorType === "tag") {
    // define matchFunction for tag
    
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
