<template>
  <div class="form-container">
    <form @submit.prevent="submitForm" class="brand-form">
      <input type="text" v-model="requestBody.Name" placeholder="Name" required />
      <input
        type="text"
        placeholder="Country of origin"
        v-model="requestBody.Country_of_Origin"
        required
      />
      <input
        type="text"
        placeholder="Address"
        v-model="requestBody.Address"
        required
      />
      <input
        type="email"
        placeholder="Email"
        v-model="requestBody.Email.work"
        required
      />
      <input type="text" placeholder="Url" v-model="requestBody.Url" required />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import router from '@/router';
import axios from '../axiosConfig';

const requestBody = {
    Name: '',
    Country_of_Origin: '',
    Address: '',
    Email: {
    work: '',
   },
   Url: '',
   productID: '610123960bb69555884b8810',
}

const submitForm = async () => {
    try {
       const response = await axios.post('/brand', requestBody)
       console.log(response.data);
       await router.push('/BrandPage')
    } catch(error){
        console.log(error)
    }
}

</script>


<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  padding: 20px;
  box-sizing: border-box;
}

.brand-form {
  max-width: 400px;
  width: 100%;
}

input[type="text"],
input[type="email"] {
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  display: block;
  width: 100%;
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

</style>
