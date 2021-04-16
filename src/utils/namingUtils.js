// ref:
// https://stackoverflow.com/questions/30521224/javascript-convert-pascalcase-to-underscore-case/38635626

const underscoreCaseToCamelNaming = (str) => {
  const res = str.replace(
    /(_[a-z])/g, 
    function (x,y) {
      return y.toUpperCase().replace(/_/, "");
    }
  ).replace(/_/, "");
  return res;
}

const pascalCaseToUnderscoreCaseNaming = (str) => {
  const res = str.replace(
    /\.?([A-Z]+)/g, 
    function (x,y) {
      return "_" + y.toLowerCase();
    }
  ).replace(/^_/, "");
  return res;
}

export default {
  underscoreCaseToCamelNaming,
  pascalCaseToUnderscoreCaseNaming,
}