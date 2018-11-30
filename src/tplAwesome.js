module.exports = function tplawesome(template, data) {
  // initiate the result to the basic template
  let res = template;
  // for each data key, replace the content of the brackets with the data
  for (let i = 0; i < data.length; i += 1) {
    res = res.replace(/\{\{(.*?)\}\}/g, (match, j) => data[i][j]);
  }
  return res;
};
