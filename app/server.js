const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())


const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://MSalazar:NRELTest@cluster0.ed93o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
MongoClient.connect(connectionString).then(client => {
    console.log('Connected to Database')
    const db = client.db('nrel');
    const inputCollection = db.collection('input')
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(3000, function() {
        console.log('listening on 3000')
    });

    app.get('/', (req, res) => {
        db.collection('input').find().toArray()
          .then(results => {
            res.render('index.ejs', {listItems: results})
          })
          .catch(error => console.error(error))
      })

    app.post('/input', (req, res) => {
        inputCollection.insertOne(req.body).then(result => {
            res.redirect('/')
        }).catch(error => console.error(error))
    })
    
    app.put('/input', (req, res) => {
        inputCollection.findOneAndUpdate(
            {input: 'nrel test'},
            {
                $set: {
                    input: req.body.input
                }
            },
            {
                upsert: true
            }
        ).then(results => {
            res.send('success')
        }).catch(error => console.error(error))
    })

    app.delete('/input', (req, res) => {
        inputCollection.deleteOne(
            {input: req.body.input}
        ).then(result => {
            res.json('input item deleted!')
        }).catch(error => console.error(error))
    })
}).catch(error => console.error(error))

