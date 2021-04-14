import NamingUtils from "./namingUtils";

const convertToCamelNaming = (obj) => {
  if (typeof obj !== "object") {
    return obj;
  }

  let objs = [ obj ];
  let currObj;
  
  while (objs.length !== 0) {
    currObj = objs.pop();

    for (let property in currObj) {
      let value = currObj[property];

      if (typeof property === "string") {
        let newProperty = NamingUtils.underscoreCaseToCamelNaming(property);
        currObj[newProperty] = value;
        if (newProperty !== property) {
          delete currObj[property];
        }
      }

      if (typeof value === "object") {
        objs.push(value);
      }
    }
  }

  return obj;
};

export default {
  convertToCamelNaming,
}