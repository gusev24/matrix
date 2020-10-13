

const stores = {
  state: {
    contacts_id: 1,
    contacts: [],

    fields_id: 1,
    fields: [],
  },

  mutations: {
    addContact(state, { name }) {
      state.contacts.push({
        id: state.contacts_id++,
        create_at: new Date().getTime(),
        name,
      })
    },

    deleteContact(state, { id }) {
      state.contacts = state.contacts.filter(_ => _.id !== id);
      state.fields = state.fields.filter(_ => _.contact_id !== id);
    },

    deleteField(state, { id }) {
      state.fields = state.fields.filter(_ => _.id !== id);
    },

    addFields(state, { contact_id }) {
      state.fields.push({
        id: state.fields_id++,
        create_at: new Date().getTime(),
        value: '',
        contact_id,
      })
    }
  }
}

export default stores;