const fs = require('fs')
const http = require('http')
const url = require('url')
const formidable = require('formidable') // модуль для парсинга multipart/form-data
const db = require('./db')

http.createServer((req, res) => {

  let pathname = url.parse(req.url).pathname

  if (pathname === '/') {
    // обработка prefligth-запроса,
    // отправляемого автоматически при посте через CORS
    if (req.method === 'OPTIONS') {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      })
      res.end()
    }

    if (req.method === 'POST') {
      let formData = new formidable.IncomingForm()

      formData.parse(req, (err, fields, files) => {
        console.log('received form:');
        console.log(JSON.stringify({fields: fields, files: files}, null, 2))

        db.saveForm(fields, (err, result) => {
          if (err) {
            res.end(err.message)
            throw err
          } else if (result) {
            res.writeHead(200, {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'text/plain'
            })
            res.end('Your data is written succesfully!')
          }
        })
      })
    }

  }

  else if (pathname === '/notes') {
    if (req.method === 'GET') {
      db.getNotes((err, docs) => {
        if (err) throw err
        res.writeHead(200, {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain'
        })
        res.end(JSON.stringify(docs, null, 2))
      })
    }
  }

  else {
    console.log('bad request')
    res.writeHead(400, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    })
    res.end('Bad Request')
  }

}).listen(8000)
