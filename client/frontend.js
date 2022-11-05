// // import { application } from 'express'
// import { createApp } from 'https://unpkg.com/vue@3.2.41/dist/vue.esm-browser.js'
// import loader from './loader.js'


// createApp({
//   components: { loader },
//   data() {
//     return {
//       loading: false,
//       form: {
//         name: '',
//         value: ''
//       },
//       contacts: []
//     }
//   },
//   computed: {
//     canCreate() {
//       return this.form.value && this.form.name
//     }
//   },
//   methods: {
//     async createContact() {
//       const { ...contact } = this.form

//       const newContact = await request('/api/contacts', 'POST', contact)
//       this.contacts.push(newContact)

//       this.form.name = ''
//       this.form.value = ''
//     },
//     async markContact(id) {
//       const markedContact = this.contacts.find(contact => contact.id === id)

//       const updated = await request(`/api/contacts/${id}`, 'PUT', { ...markedContact, marked: !markedContact.marked })
//       markedContact.marked = updated.marked
//     },
//     async deleteContact(id) {
//       await request(`/api/contacts/${id}`, 'DELETE')
//       this.contacts = this.contacts.filter(contact => contact.id !== id)
//     }
//   },
//   async mounted() {
//     this.loading = true
//     this.contacts = await request('/api/contacts')
//     console.log(this.contacts);
//     this.loading = false
//   }

// }).mount('#app')

// async function request(url, method = 'GET', data = null) {
//   try {
//     const headers = {}
//     let body

//     if (data) {
//       headers['Content-Type'] = 'application/json'
//       body = JSON.stringify(data)
//     }

//     const response = await fetch(url, { method, headers, body })
//     return await response.json()
//   } catch (e) {
//     console.log(`request Error ${e.message}`);
//   }
// }