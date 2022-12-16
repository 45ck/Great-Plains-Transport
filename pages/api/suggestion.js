// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"

export default function handler(req, res) {
  
  const address = req.query.address;

  // this will return a list of guesses from position stack of what the street actually is.

  axios.get(`http://api.positionstack.com/v1/forward?access_key=3137cb7d2233a29c59ab097ea72574e7&country=AU&query=${address}`).then((res2) => {
    res.status(200).json({result: res2.data});
  });
 
}

