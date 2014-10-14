var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  if (matchFunc(startEl)) {
    resultSet.push(startEl);
  }

  for (var i = 0; i < startEl.children.length; i++) {
    resultSet = resultSet.concat(traverseDomAndCollectElements(matchFunc, startEl.children[i]));
  }

  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag
//
var selectorTypeMatcher = function(selector) {
  var delimiterIndex = selector.search(/[#.]/i);
  var delimiter = selector[delimiterIndex];
  var arrOfString = selector.split(delimiter);
  var type = '';

  if (delimiterIndex === -1) type += 'tag';
  else if (delimiterIndex === 0) {
    if (delimiter === '.') type += 'class';
    if (delimiter === '#') type += 'id';
  } else {
    if (delimiter === '.') type += 'tag.class';
    if (delimiter === '#') type += 'tag.id';
  }

  return type;
};

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;

  var idClassTagGetter = function(selector) {
    var delimiterIndex = selector.search(/[#.]/i);
    var delimiter = selector[delimiterIndex];
    var arrOfString = selector.split(delimiter);
    if (delimiterIndex >= 0) {
      return arrOfString[1];
    } else {
      return arrOfString[0];
    }
  };

  if (selectorType === "id") {
    matchFunction = function(element) {
      var regExp = new RegExp('^' + idClassTagGetter(selector + '$'));
      var index = element.id.search(regExp);
      if (index > - 1) return true;
      else return false;
    }
  } else if (selectorType === "class") {
    matchFunction = function(element) {
      var index = element.className.split(' ').indexOf(idClassTagGetter(selector));
      if (index > - 1) return true;
      else return false;
    }
  } else if (selectorType === "tag.class") {
    matchFunction = function(element) {
      var regExp = new RegExp('^' + idClassTagGetter(selector + '$'));
      var index = element.className.search(regExp);
      if (index > - 1) return true;
      else return false;
    }
  } else if (selectorType === "tag") {
    matchFunction = function(element) {
      var regExp = new RegExp('^' + idClassTagGetter(selector + '$'));
      var index = element.tagName.toLowerCase().search(regExp);
      if (index > - 1) return true;
      else return false;
    }
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
