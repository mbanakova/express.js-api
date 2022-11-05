<template>
	<div class="home">
		<h1>REST API</h1>

		<form class="form-inline mb-3" @submit.prevent="createContact">
			<div class="form-group mr-5">
				<label for="name" class="mr-3">Имя</label>
				<input type="text" class="form-control" id="name" v-model.trim="form.name" />
			</div>
			<div class="form-group mr-5">
				<label for="value" class="mr-3">Значение</label>
				<input type="text" class="form-control" id="value" v-model.trim="form.value" />
			</div>
			<button class="btn btn-primary" type="submit" :disabled="!canCreate">Создать</button>
		</form>

		<div v-if="loading">
			<Loader />
		</div>
		<div v-else-if="contacts.length">
			<div class="card mb-3" v-for="contact in contacts" :key="contact.id">
				<div class="card-body">
					<h5 class="card-title" :class="{ marked: contact.marked }">{{ contact.name }}</h5>
					<p class="card-text">{{ contact.value }}</p>
					<button class="btn btn-primary" @click="markContact(contact.id)">Отметить</button>
					<button class="btn btn-danger" @click="deleteContact(contact.id)">Удалить</button>
				</div>
			</div>
		</div>
		<p v-else>Контактов пока нет</p>
	</div>
</template>

<script>
import Loader from "@/components/Loader";

export default {
	name: "HelloWorld",
	components: Loader,
	data() {
		return {
			loading: false,
			form: {
				name: "",
				value: "",
			},
			contacts: [],
		};
	},
	computed: {
		canCreate() {
			return this.form.value && this.form.name;
		},
	},
	methods: {
		async createContact() {
			const { ...contact } = this.form;

			const newContact = await request("/api/contacts", "POST", contact);
			this.contacts.push(newContact);

			this.form.name = "";
			this.form.value = "";
		},
		async markContact(id) {
			const markedContact = this.contacts.find(contact => contact.id === id);

			const updated = await request(`/api/contacts/${id}`, "PUT", { ...markedContact, marked: !markedContact.marked });
			markedContact.marked = updated.marked;
		},
		async deleteContact(id) {
			await request(`/api/contacts/${id}`, "DELETE");
			this.contacts = this.contacts.filter(contact => contact.id !== id);
		},
	},
	async mounted() {
		this.loading = true;
		this.contacts = await request("/api/contacts");
		console.log(this.contacts);
		this.loading = false;
	},
};

async function request(url, method = "GET", data = null) {
	try {
		const headers = {};
		let body;

		if (data) {
			headers["Content-Type"] = "application/json";
			body = JSON.stringify(data);
		}

		const response = await fetch(url, { method, headers, body });
		return await response.json();
	} catch (e) {
		console.log(`request Error ${e.message}`);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
