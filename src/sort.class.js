const checker = require('javascript-type-checker');

class Sort {

  doSort(arrayToSort, sortJson) {
    if(!this.isArray(arrayToSort)) {
      throw new Error('Argument to sort is not an array');
    } else if(!this.isObject(sortJson)){
      throw new Error('Sort parameters is not an object');
    }
    return arrayToSort.sort((a,b) => {
      const keyList = Object.getOwnPropertyNames(sortJson);
      for(let i in keyList) {
        let aval = a, bval = b;
        const splitIndexArray = keyList[i].split('.');
        for(let i in splitIndexArray) {
          aval = aval[splitIndexArray[i]];
          if(checker.isNull(aval) || checker.isUndefined(aval)) {
            break;
          }
        }
        for(let i in splitIndexArray) {
          bval = bval[splitIndexArray[i]];
          if(checker.isNull(bval) || checker.isUndefined(bval)) {
            break;
          }
        }

        if(checker.isNull(aval) || checker.isUndefined(aval)) {
          return -1;
        }

        if(checker.isNull(bval) || checker.isUndefined(bval)) {
          return 1;
        }

        if(checker.getType(aval) !== checker.getType(bval)) {
          throw new Error('Type of corresponding keys in all elements must be same if keys exist');
        }
        if(checker.isArray(aval)) {
          aval = aval.length;
        }

        if(checker.isArray(bval)) {
          bval = bval.length;
        }

        if(checker.isObject(aval)) {
          aval = Object.getOwnPropertyNames(aval).length;
        }

        if(checker.isObject(bval)) {
          bval = Object.getOwnPropertyNames(bval).length;
        }

        let sortVal = 1;
        if(sortJson[keyList[i]] === -1) {
          sortVal = -1;
        }
        if(aval !== bval) {
          if(checker.getType(aval) === "number"){
            return (aval-bval)*sortVal;
          } else if(checker.getType(aval) === "boolean") {
            return (aval?-1:1)*sortVal;
          } else if(checker.getType(aval) === "string") { 
            return ((aval.toLowerCase()<bval.toLowerCase())?-1:1)*sortVal;
          }
        }
      }
      return -1;
    });
  }
}
