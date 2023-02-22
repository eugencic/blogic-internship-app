<template>
  <div> 
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
    >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-text-field
          v-model="search"
          @keyup.enter="filterSearch"
          placeholder="Search"
          append-icon="mdi-magnify"
          class="shrink"
        >
        </v-text-field>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-btn 
          class="mx-2"
          small
          fab
          dark
          color="teal"
          @click="createItem(item)"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.fragile`]="{ item }">
      <v-icon 
        v-for="icon in icons[item.fragile]" 
        :key="icon">
        {{icon}}
      </v-icon>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        color="teal darken-2"
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        color="red darken-2"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
  {{info}}
  </div>
</template>

<script>
  export default {
    data: () => ({
      info: "",
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Name', align: 'start', value: 'name', sortable: false },
        { text: 'Code', value: 'code' },
        { text: 'Price', value: 'price', filterable: false },
        { text: 'Quantity', value: 'quantity', filterable: false },
        { text: 'Fragile', value: 'fragile', filterable: false },
        { text: 'Actions', value: 'actions', sortable: false, filterable: false },
      ],
      icons: {
        true: ["mdi-check"],
        false: ["mdi-close"],
      },
      selectedId: null,
    }),

    computed: {
      items() {
        return this.$store.state.items;
      },
    },

    mounted() {
      this.$store.dispatch('loadItems', "");
    },

    watch: {
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    
    methods: {
      createItem () {
        this.$router.push({ 
          name: 'forms', 
          })
      },

      editItem (item) {
        this.$router.push({ 
          name: 'forms', 
          params: {
            id: item.id,
          }
        })
      },

      deleteItem (item) {
        this.selectedId = item.id
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.$store.dispatch('deleteItemConfirm', {selectedId: this.selectedId});
        this.closeDelete()
      },

      closeDelete () {
        this.dialogDelete = false
        this.selectedId = null
      },

      filterSearch () {
        this.$store.dispatch('loadItems', this.search);
        this.closeDelete()
      },
    },
  }
</script>