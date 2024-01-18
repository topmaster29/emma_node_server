const express = require('express')
const axios = require('axios')
const app = express()
const port = 3003



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/inmate', (req, res) => {
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