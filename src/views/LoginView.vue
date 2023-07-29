<template>
  <div id="app">
    <div id="login">
      <div id="description">
        <h1>Login</h1>
      </div>
      <div id="form">
        <form @submit.prevent="login">
          <label for="username">User Name</label>
          <input
            type="text"
            id="username"
            v-model="form.userName"
            placeholder="your name"
            autocomplete="off"
            @input="v.userName.$touch()"
          />
          <template v-if="v.userName.$dirty && v.userName.$error">
            <div v-if="v.userName.required.$invalid" class="error">
              Username is required
            </div>
          </template>

          <div class="password">
            <label for="password">Password</label>
            <input
              :type="passwordVisible ? 'text' : 'password'"
              v-model="form.password"
              id="password"
              placeholder="*****"
              @input="v.password.$touch()"
            />
             <button @click="togglePasswordVisibility">
              <i v-bind:class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'">
              </i>
            </button>
            <template v-if="v.password.$dirty && v.password.$error">
              <div v-if="v.password.required.$invalid" class="error">
                password is required
              </div>
            </template>
          </div>
          
          <button @click="login">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "../axiosConfig";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const form = reactive({
  userName: "",
  password: "",
});

const passwordVisible = ref(false);
const errorMessage = ref("");
const router = useRouter();

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const rules = {
  userName: { required },
  password: { required },
};

const v = useVuelidate(rules, form);

const login = async () => {
  v.value.$touch();
  if (!v.$error) {
    try {
      const response = await axios.post("auth/login", {
        userName: form.userName,
        password: form.password,
      });
      console.log(response);
      localStorage.setItem("token", response.data.message.token);
      await router.push("/productpage");
    } catch (error) {
      errorMessage.value = "Invalid username or password";
      console.log(error);
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  font-family: Verdana, sans-serif;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

div#app {
  width: 100%;
  height: 100%;
}

div#app div#login {
  align-items: center;
  background-color: #e2e2e5;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

div#app div#login div#description {
  background-color: #ffffff;
  width: 280px;
  padding: 35px;
}

div#app div#login div#description h1,
div#app div#login div#description p {
  margin: 0;
}

div#app div#login div#description p {
  font-size: 0.8em;
  color: #95a5a6;
  margin-top: 10px;
}

div#app div#login div#form {
  background-color: #34495e;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #ecf0f1;
  width: 260px;
  padding: 35px;
}

div#app div#login div#form label,
div#app div#login div#form input {
  outline: none;
  width: 100%;
}

div#app div#login div#form label {
  color: #95a5a6;
  font-size: 0.8em;
}

div#app div#login div#form input {
  background-color: transparent;
  border: none;
  color: #ecf0f1;
  font-size: 1em;
  margin-bottom: 20px;
}

div#app div#login div#form ::placeholder {
  color: #ecf0f1;
  opacity: 1;
}

div#app div#login div#form button {
  background-color: #ffffff;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

div#app div#login div#form button:hover {
  background-color: #eeeeee;
}

@media screen and (max-width: 600px) {
  div#app div#login {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }

  div#app div#login div#description {
    margin: 0 auto;
    max-width: 350px;
    width: 100%;
  }

  div#app div#login div#form {
    border-radius: unset;
    box-shadow: unset;
    width: 100%;
  }

  div#app div#login div#form form {
    margin: 0 auto;
    max-width: 280px;
    width: 100%;
  }
}

</style>
