<template>
  <div class="grid">
    <div v-for="brand of brands" :key="brand._id" class="grid-item">
      <h2>Name: {{ brand.Name }}</h2>
      <h2>Country of origin: {{ brand.Country_of_Origin }}</h2>
      <h2>Address: {{ brand.Address }}</h2>
      <h2>Product ID: {{ brand.productId }}</h2>
      <h2>Email: {{ brand.Email }}</h2>
    </div>

    <div class="button-container">
      <!-- <button
            class="edit-button"
            @click="editProduct"
          >
           Edit
          </button> -->
      <router-link
        :to="{ path: '/brandpage/edit/' + brand.id }"
        class="edit-button"
      >
        Edit
      </router-link>
      <button class="delete-button" @click="deleteProduct(brand?._id)">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";

onMounted(async () => {
  try {
    const response = await axios.get('/brand')
    console.log(response);
  } catch (error) {
     console.error(error)
  }
})

</script>

<style scoped>
</style>
