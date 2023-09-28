var capitalize = (value) => {
  if (value) {
    var char = value.charAt(0).toUpperCase();
    var spl = value.slice(1).toLowerCase();
    var caps = char + spl;
    return caps;
  } else {
    return "";
  }
};

module.exports = {
  capitalize: capitalize,
};
