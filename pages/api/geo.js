// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"

export default function handler(req, res) {
  
  const location1FreeText = req.query.location1;
  const location2FreeText = req.query.location2;

  const depotLocations = [
    {name: 'Sydney', coords: {"latitude": -33.865143, "longitude": 151.209900}}, 
    {name: 'Melbourne', coords:  {"latitude": -37.840935, "longitude": 144.946457}}, 
    {name: 'Adelaide', coords:  {"latitude": -34.921230, "longitude": 138.599503}},
    {name: 'Darwin', coords:  {"latitude": -12.462827, "longitude": 130.841782}}, 
    {name: 'Brisbane', coords:  {"latitude": -27.4675, "longitude": 153.0231}}, 
    {name: 'Perth', coords:  {"latitude": -31.953512, "longitude": 115.857048}}]

  axios.get(`http://api.positionstack.com/v1/forward?access_key=${process.env.POSSTACK_KEY}&country=AU&query=${location1FreeText}`).then((res1) => {
    const location1Data = res1.data.data[0];

    // find the closest capital city to the pickup address excluding Canberra and Hobart.

    var closestCapital = {}; 
    var depotToAddressDistance = 10000;

    for (let i = 0; i < depotLocations.length; i++) {

        let capitalCityCoordinates = depotLocations[i].coords;
        let pickupAddressCoordinates = location1Data;
        
        let distance = getDistanceFromLatLonInKm(
          capitalCityCoordinates.latitude, capitalCityCoordinates.longitude,
          pickupAddressCoordinates.latitude, pickupAddressCoordinates.longitude);

        // if this distance is the smallest so far

        if (distance < depotToAddressDistance) {
          closestCapital = depotLocations[i];
          depotToAddressDistance = distance;
        }
    }

    axios.get(`http://api.positionstack.com/v1/forward?access_key=${process.env.POSSTACK_KEY}&country=AU&query=${location2FreeText}`).then((res2) => {
        const location2Data = res2.data.data[0];
        
        const distance = getDistanceFromLatLonInKm(location1Data.latitude, location1Data.longitude,
          location2Data.latitude, location2Data.longitude);

          const totalDistance = distance + depotToAddressDistance;
          
          res.status(200).json({ success: "true",
            "totalDistance": totalDistance, 
          "closestCapital": closestCapital,
          "capitalToPickupKm": depotToAddressDistance,
          "pickupToDelivery": distance,
          data: [res1.data, res2.data] });
      }).catch((errorMessage) => {
        returnErrorMessage({where: "location2"});
      });
  }).catch((errorMessage) => {
    returnErrorMessage({where: "location1"});
  });

  const returnErrorMessage = (errorMessage) => {
    console.log(errorMessage);  // log to server log
    res.status(400).json({success: "false", error: "true", details: errorMessage});
  }
  
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
