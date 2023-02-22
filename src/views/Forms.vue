<template>
  <div>
    <v-form 
      v-model="valid">
      <v-container>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="item.name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="item.code"
            :rules="codeRules"
            label="Code"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="item.price"
            :rules="priceRules"
            label="Price"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="item.quantity"
            :rules="quantityRules"
            label="Quantity"
            required
          ></v-text-field>
        </v-col>
          <v-container>
            <v-radio-group v-model="item.fragile"
            row>
              <template v-slot:label>
                <div>Fragile</div>
              </template>
              <v-radio :value="true">
                <template v-slot:label>
                  <div>Yes</div>
                </template>
              </v-radio>
              <v-radio :value="false">
                <template v-slot:label>
                  <div>No</div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-container>
        <v-col>
          <v-btn
            class="mr-4"
            color="success"
            :disabled="!valid"
            @click="save"
          >
            Save
          </v-btn>
          <v-btn 
            class="mr-4"
            @click="cancel"
          >
            Cancel
          </v-btn>
        </v-col>
    </v-container>
  </v-form>
</div>
</template>

<script>
  export default {
    name: "forms",
    props: {
      id: String
    },
    data: () => ({
      valid: false,
      item: {
        //id: '',
        name: '',
        code: '',
        price: 1,
        quantity: 1,
        fragile: false
      },
      nameRules: [
        v => !!v || 'Name is required',
      ],
      codeRules: [
        v => !!v || 'Code is required',
      ],
      priceRules: [
        v => !!v || 'Price is required',
        v => v > 0 || 'Price must be bigger than 0',
      ],
      quantityRules: [
        v => !!v || 'Quantity is required',
        v => v > 0 || 'Quantity must be bigger than 0',
      ],
    }),

    computed: {
      items() {
        return this.$store.state.items;
      },
    },

    created () {
      if (this.id) {
        this.item = this.$store.state.items.find(x => x.id === this.id);
      }
    },

    methods: {
      save () {
        if(!this.validate()) return
        if (this.id) {
          this.$store.dispatch('saveItem', {currentId: this.id, item: this.item})
          this.$router.push({ 
            name: 'items', 
          })
        } else {
          this.$store.dispatch('createItem', this.item)
          this.$router.push({ 
            name: 'items', 
          })
        } 
      },
      validate () {
        let existingItem = null
        if (this.id) {
          existingItem = this.items.find(x => x.code == this.item.code && x.id != this.id)
        } else {
          existingItem = this.items.find(x => x.code == this.item.code)
        }
        if (existingItem) {
          alert("Item code already exists")
          return false
        } 
        return true
      },
      cancel () {
        this.$router.push({ 
          name: 'items', 
        })
      },
    }
  }
</script>