// const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require("./iss");
const {nextISSTimesForMyLocation} = require("./iss");

// fetchMyIP((error, IP) => {
//   if (error) {
//     console.log("It didn't work... ", error);
//   } else {
//     console.log("It worked! ", IP);
//   }
// });

// fetchCoordsByIP("99.229.15.42", (error, data) => {
//   if (error) {
//     console.log("It didn't work.. ", error);
//   } else {
//     console.log("It worked! Coordinates: ", data);
//   }
// });

// fetchISSFlyOverTimes({latitude: 43.8828401, longitude: -79.4402808}, (error, data) => {
//   if (error) {
//     console.log("It didn't work.. ", error);
//   } else {
//     console.log("It worked! ", data);
//   }
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});

const printPassTimes = function(passTimes) {
  for (let i = 0; i < passTimes.response.length; i++) {
    const risetime = passTimes.response[i].risetime;
    // const date = new Date(risetime * 1000);//since it expects it to be in milliseconds not seconds
    // const dateString = date.toLocaleString();
    const datetime = new Date(0);
    datetime.setUTCSeconds(risetime);

    console.log(`Next pass at ${datetime} for ${passTimes.response[i].duration} seconds`);
  }
};


