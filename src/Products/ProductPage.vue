<template>
    <div class="grid">
      <div v-for="product of prd" :key="product.id" class="grid-item">
           <div class="image-container">
            <img :src="product.image" alt="Product Image" class="product-image" />
           </div>
        <h1>{{ product?.name }}</h1>
        <p>{{ product?.description }}</p>
        <p>Model: {{ product?.dimensions?.model }}</p>
        <p>Size: {{ product?.dimensions?.size }}</p>
        <div class="button-container">
          <router-link :to="{ path: '/productpage/edit/'+product.id}" class="edit-button">
            Edit
          </router-link>
           <button
                class="delete-button"
                @click="deleteProduct(product?._id)"
            >
            Delete
        </button>
        </div>
        </div>
    </div>
    <router-view />
</template>

<script setup>

import { computed, onMounted, ref } from 'vue';
// import { useRouter } from 'vue-router';
import axios from '../axiosConfig';


const products = ref([]);

const prd = computed(()=> products.value)
// const product
// const product = computed(()=> {
// return products})

onMounted(async () => {``
  try {
    const response = await axios.get('/product'); 
    const data = response.data.message;
    products.value = data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});


const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`/product/${productId}`);
    console.log(response.data)
  } catch (error) {
    console.log(error);
  }
  try {
    const response = await axios.get('/product');
    const data = response.data.message;
    products.value = data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}


</script>

<style>
.grid {
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
   grid-gap: 20px;
   padding-left: 10px;
}

.grid-item {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.product-image {
  max-width: 100%;
  max-height: 400px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin-bottom: 10px;
}

.delete-button {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

</style>
 