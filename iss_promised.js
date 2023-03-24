const request = require("request-promise-native");

const fetchMyIP = function() {
  // return request("https://api.ipify.org?format=json").then(body => JSON.parse(body).ip);
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then(fetchISSFlyOverTimes)//handler, not invoking it right now, don't need ()
    .then((body) => {
      const {response} = JSON.parse(body);
      return {response};
    });
};

module.exports = { nextISSTimesForMyLocation };

