module.exports = {
  extends: "airbnb-base",
  rules: {
    "linebreak-style": 0,
    "no-shadow": "off",
   
  },
  globals: {
    window: true,
    document: true,
    fetch: false,
    gapi: false,
    localStorage: true
  },
  env: {
    mocha: true
  }
};
