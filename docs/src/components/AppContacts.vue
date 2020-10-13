<template>
  <div class="layout">
    <div class="contacts-head">
      <h2 class="contacts-title center">
        Добавить новый контакт
      </h2>
    </div>

    <div class="contacts-body">
      <input
        required
        class='contacts-name'
        type='text'
        placeholder="Имя контакта"
        title='Имя контакта'
        v-model="input.name"
      />
      <span
        class='contacts-btn_add'
        @click='addContact(input)'
      >
        Добавить
      </span>
    </div>

    <div class="contacts-list">
      <div class="list-head">
        <h2 class="list-title center">
          Список контактов
        </h2>
      </div>

      <div v-if='contacts.length === 0'>
        Список пуст
      </div>

      <div 
        v-else
        class="list-items"
      >
        <div 
          class="list-item"
          v-for='contact of contacts'
          :key='contact.id'
        >
          <router-link
            :to="{ path: `contact/${contact.id}` }"
          >{{ contact.name }}</router-link>

          <span>
            <i
              class='fa fa-trash'
              @click='deleteContact(contact)'            
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    contacts() {
      return this.$store.state.contacts
    }
  },

  data() {
    return {
      input: {
        name: '',
      }
    }
  },

  methods: {
    addContact({ name }) {
      this.$store.commit({
        type: 'addContact',
        name: name.trim(),
      });
    },
    
    deleteContact({ id }) {
      if (confirm("Удалить контакт?")) {
        this.$store.commit({
          type: 'deleteContact',
          id
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  %center-elements {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  $lightViolet: #7400cc;
  $darkViolet: #2a004a;

  .layout {
    @extend %center-elements;

    .center {
      text-align: center;
    }
    
    .contacts-head,
    .contacts-body,
    .contacts-list {
      @extend %center-elements;
      min-width: 300px;
    }

    .contacts-body {
      flex-direction: row;

      .contacts-name,
      .contacts-btn_add {
        padding: 5px;
      }

      .contacts-name {
        border: 1px solid black;
        border-radius: 5px;
      }

      .contacts-btn_add {
        background: $lightViolet;
        color: #e2e2e2;
        border-radius: 5px;
        cursor: pointer;
        transition: .3s all;

        &:hover {
          background: $darkViolet;
          color: white;
        }
      }
    }

    .contacts-list {
      margin-top: 2%;

      .list-items {
        @extend %center-elements;

        .list-item {
          color: black;
          transition: .5s all;
          border-bottom: 1px solid transparent;
          font-size: 1.2em;

          &:hover {
            border-bottom-color: black;
          }

          a {
            text-decoration: none;
            color: black;

            &:hover {
              color: $lightViolet;
            }
          }

          .fa-trash {
            cursor: pointer;

            &:hover {
              color: $lightViolet;
            }
          }
        }
      }
    }
  }
</style>