const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3003

var corsOptions = {
  origin: 'https://emmaspremiumservices.com/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/inmate', cors(corsOptions), (req, res) => {
  const {inmateDin} = req.query;
  try {
    axios({
      method:'post',
      url:'https://nysdoccslookup.doccs.ny.gov/IncarceratedPerson/SearchByDin', 
      data: inmateDin,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'content-type': 'application/json; charset=utf-8'
      }
    }).then(({data})=>{
      res.send({
        error: data.error,
        data: data
      })
    }).catch(err=>{
      res.send({
        error: false,
        data: null
      })    
    })
  } catch (error) {
    res.send({
      error: false,
      data: null
    })    
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})