
// ------ PROGRESS:      3.D ex 3.20
require('dotenv').config()
const express = require('express')
const logger = require('morgan');
const cors = require('cors')
const Person = require('./models/person')
const app = express()
logger.token('body', (req, res) => JSON.stringify(req.body));


app.use(express.json())
app.use(cors())
app.use(logger('tiny'));
app.use(express.static('build'))
app.use(logger(':method :url :status :res[content-length] - :response-time ms :body '));



app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})
app.get('/info', (req,res) => {
    let count = 0;
    Person.count().then(result => {
        count = result
        let l1 = `<p>Phonebook has info for people: ${count}</p> <p> ${Date()}</p>`;
        res.send(l1)
    })
})
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(response.status(204).end())
})
app.post("/api/persons",(request,response,next) => {
    const body = request.body

    if (Object.keys(body).length === 0 || !body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if (!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        response.json(result)
    }).catch(error => next(error))
} )
app.put("/api/persons/:id",(request,response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, {
        new: true,
        runValidators: true,
        context: 'query',
    })
        .then((updatedPerson) => {
            response.json(updatedPerson.toJSON())
        })
        .catch((error) => next(error))
} )


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}   // handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    //console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
                         console.log(`Server running on port ${PORT}`)
                     })