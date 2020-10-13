<template>
  <div class="layout" v-if='contact'>
    <div class="contact-head">
      <h2 class="contact-title center">
        Информация о контакте {{ contact.name }}

        <i class="fa fa-history" title='Undo' @click='prevSnap()' />

        <router-link to="/" title='close'>
          <i class="fa fa-times" />
        </router-link>
      </h2>
    </div>

    <div class="contact-body">
        <div class="body-items">
          <div 
            v-for='field of fields.filter(_ => _.contact_id === contact.id)'
            :key='field.id'
            class="body-item"
          >
            <input 
              type="text"
              class='body-input'
              :pattern="patterns.field"
              v-model="field.value"
              @change='isChanged = true'
              @blur="saveSnap(field)"
            />

            <i
              class='fa fa-reply'
              title='Undo'
              @click='prevSnapForField(field)'
            />

            <i
              class='fa fa-trash'
              title="Delete"
              @click='deleteField(field)'
            />
          </div>
        </div>
        <div class="body-panel">
          <span 
            class="panel-new_field"
            @click='createNewEmptyField()'
          >
            Добавить поле
          </span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    contactId() {
      return this.$route.params.id
    },

    contact() {
      return this.$store.state.contacts.find(_ => _.id == this.contactId)
    },

    fields() {
      return this.$store.state.fields
    }
  },

  created() {
    if (this.contact === undefined) {
      return this.$router.push('/');
    }
  },

  data() {
    return {
      patterns: {
        field: '.+:.+'
      },

      isChanged: false,

      history: {
        list: [],
        max_length: 10,
        now: 1,
      }
    }
  },

  methods: {
    createNewEmptyField() {
      this.$store.commit('addFields', { contact_id: this.contact.id });
    },

    deleteField({ id }) {
      if (confirm("Удалить поле?")) {
        this.$store.commit({
          type: 'deleteField',
          id
        })
      }
    },

    saveSnap(field) {
      if (!this.isChanged) {
        return;
      }
      
      this.isChanged = false;

      this.history.list.push({
        field,
        value: field.value,
        time: new Date().getTime(),
      })

      if (this.history.list.length > this.history.max_length) {
        this.history.list = this.history.list.slice(1, this.history.max_length);
      }

      this.history.now = 1;
    },

    prevSnapForField(field) {
      let history = this.history.list.filter(_ => _.field.id === field.id);
      if (history.length === 0 || !confirm('Вернуть предыдущее значение?')) {
        return;
      }

      let index = history.length - 2;
      let lastHistory = history[index];

      field.value = lastHistory.value;
    },

    prevSnap() {
      let history = this.history.list;
      if (history === undefined) {
        return;
      }

      let index = history.length - this.history.now++;
      let currentHistory = history[index];
      if (currentHistory) {
        currentHistory.field.value = currentHistory.value;
      }

      if (index <= 0) {
        this.history.now = history.length;
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

    .fa {
      transition: .3s all;
      cursor: pointer;
      color: black;

      &:hover {
        color: $lightViolet;
      }
    }

    .contact-head,
    .contact-body,
    .body-items,
    .body-panel {
      @extend %center-elements;
      min-width: 300px;
    }

    transition: .5s all;

    .contact-body {
      flex-direction: column;

      .body-items {
        @extend %center-elements;
        .body-item {
          margin-top: 5px;

          input {
            padding: 5px;
            border: 1px solid black;
            border-radius: 5px;

            &:invalid {
              color: red;
            }
          }
        }
      }

      .body-panel {
        margin-top: 10px;

        .panel-new_field {
          padding: 5px;
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
    }
  }
</style>