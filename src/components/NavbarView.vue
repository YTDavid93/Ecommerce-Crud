<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

        <div class=" collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ms-auto ">
          <li class="nav-item">
            <router-link class="nav-link mx-2 active" aria-current="page" to="/productpage">Product Page</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-2" aria-current="page" to="/addproduct">Add Product</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-2 active" aria-current="page" to="/brandpage">Brand Page</router-link>
          </li>
          <li  class="nav-item">
            <router-link class="nav-link mx-2 active" aria-current="page" to="/addbrand">Add Brand</router-link>
          </li>
          <button v-if="isLoggedIn" type="button" class="logout-Button" @click="logout"> Logout </button>
          </ul>
        </div>
        </div>
        </nav>
 </template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isLoggedIn = ref(false);
const loginState = ref(false);
const router = useRouter();

const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    loginState.value = false;
    router.push('/'); // Redirect to the login page after logout
};

// Check if user is already logged in on component mount
if (localStorage.getItem('token')) {
    loginState.value = true;
}

</script>

<style scoped>
/* #nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: whitesmoke;
  background: crimson;
  border-radius: .5rem;
} */

.logout-Button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 16px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>