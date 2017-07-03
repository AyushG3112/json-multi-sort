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
          if(aval === null || aval === undefined) {
            break;
          }
        }
        for(let i in splitIndexArray) {
          bval = bval[splitIndexArray[i]];
          if(bval === null || bval === undefined) {
            break;
          }
        }

        if(aval === null || aval === undefined) {
          return -1;
        }

        if(bval === null || bval === undefined) {
          return 1;
        }

        if(Object.prototype.toString.call(aval) !== Object.prototype.toString.call(bval)) {
          throw new Error('Type of corresponding keys in all elements must be same if keys exist');
        }
        if(this.isArray(aval)) {
          aval = aval.length;
        }

        if(this.isArray(bval)) {
          bval = bval.length;
        }

        if(aval !== bval) {
          if(typeof(aval) === "number"){
            return (aval-bval)*sortJson[keyList[i]];
          } else if(typeof(aval) === "boolean") {
            return (aval?-1:1)*sortJson[keyList[i]];
          } else if(typeof(aval) === "string") { 
            return ((aval.toLowerCase()<bval.toLowerCase())?-1:1)*sortJson[keyList[i]];
          }
        }
      }
      return -1;
    });
  }

  isArray(object) {
    return Object.prototype.toString.call(object) ===  "[object Array]";
  }

  isObject(object) {
    return Object.prototype.toString.call(object) ===  "[object Object]";
  }
}
