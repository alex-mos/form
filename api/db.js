const mongo = require('mongodb').MongoClient
const dburl = 'mongodb://localhost:27017/form'

const saveForm = (fields, callback) => {
  // fields должен быть объектом, готовым для записи в базу
  mongo.connect(dburl, (err, db) => {
    if (err) {
      err.message = 'Can\'t connect to database'
      return callback(err)
    }
    const collection = db.collection('notes')
    collection.insert(fields, (err, data) => {
      if (err) {
        err.message = 'Can\'t insert data to database'
        return callback(err)
      }
      db.close()
      return callback(null, true)
    })
  })
}

const getNotes = (callback) => {
  mongo.connect(dburl, (err, db) => {
    if (err) {
      err.message = 'Can\'t connect to database'
      return callback(err)
    }
    const collection = db.collection('notes')
    collection.find(
      {

      }
    ).toArray((err, docs) => {
      if (err) return callback(err)
      return callback(null, docs)
      db.close()
    })
  })
}

module.exports.saveForm = saveForm
module.exports.getNotes = getNotes
