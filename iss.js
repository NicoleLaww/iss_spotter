const request = require("request");

const fetchMyIP = (callback) => {
  request("https://api.ipify.org/?format=json", (error, response, body) => {

    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      // console.log(typeof body);
      const data = JSON.parse(body);
      // console.log(data);
      const address = data.ip;
      // console.log(address);
      callback(null, address);
    }
  });
};

const fetchCoordsByIP = (IP, callback) => {
  request(`http://ipwho.is/${IP}`, (error, response, body) => {

    if (error) {
      callback(error, null);
    } else {
      const parsedData = JSON.parse(body);
      // console.log(parsedData);
      if (parsedData.success === false) {
        const msg = `Success status was ${parsedData.success}. Server message says: ${parsedData.message}`;
        callback(Error(msg), null);
      } else {
        const { latitude, longitude } = parsedData;
        callback(null, { latitude, longitude });
      }
    }
  });

};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      callback(Error(`Status Code: ${response.statusCode}`), null);
    } else {
      const parsedData = JSON.parse(body);
      // console.log(parsedData);
      const { response } = parsedData;

      callback(null, { response });
    }

  });
};


const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, IP) => {
    if (error) {
      callback(error, null);
    }

    fetchCoordsByIP(IP, (error, coords) => {
      if (error) {
        callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, passedTimes) => {
        if (error) {
          callback(error, null);
        }

        callback(null, passedTimes);
      });
    });
  });
};




// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
module.exports = { nextISSTimesForMyLocation };