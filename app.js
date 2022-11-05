const express = require('express')
const path = require('path')
const { v4 } = require('uuid')
const app = express()

let CONTACTS = [
  { id: v4(), name: "Me", value: '12322', marked: false }
]

app.use(express.json())

app.get('/api/contacts', (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS)
  }, 1000)
})

app.post('/api/contacts', (req, res) => {
  const contact = { ...req.body, id: v4(), marked: false }
  CONTACTS.push(contact)
  res.status(201).json(contact)
})

app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter(contact => contact.id !== req.params.id)
  res.status(200).json({ message: 'Contact deleted' })
})

app.put('/api/contacts/:id', (req, res) => {
  const idx = CONTACTS.findIndex(contact => contact.id === req.params.id)
  CONTACTS[idx] = req.body
  res.json(CONTACTS[idx])
})

// app.use(express.static(path.resolve(__dirname, 'client')))
app.use(express.static(path.resolve(__dirname, 'frontend/dist')))
app.get('*', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
  res.sendFile(path.resolve(__dirname, 'frontend/dist/index.html'))
})

app.listen(3000, () => console.log('Server started on port 3000...'))