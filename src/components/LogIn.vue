<template>
  <div class="max-w-sm mx-auto mt-8 p-4 bg-white text-gray-800 rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold mb-4">Login</h2>
    <form @submit.prevent="loginUser">
      <div class="mb-2">
        <label for="username" class="block text-sm font-medium text-gray-600">Username:</label>
        <input type="text" id="email" v-model="email" required class="form-input rounded-lg border border-gray-300 py-2 px-4">
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-600">Password:</label>
        <input type="password" id="password" v-model="password" required class="form-input rounded-lg border border-gray-300 py-2 px-4">
      </div>
      <div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
      </div>
    </form>
    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      loginUser() {
        const userData = {
        email: this.email,
        password: this.password,
      };
        axios
          .post('https://97e2a7a5d2ba0d8694e821f9bf883e79.serveo.net/user/login', userData, {
          headers: {
            'Content-Type': 'application/json', // Specify content type as JSON
          }})
          .then(() => {
            // Handle the login success
            console.log('User logged in successfully');
            this.errorMessage = ''; // Clear any previous error messages
            this.$emit('authenticated'); // Emit the authenticated event
          })
          .catch(error => {
            // Handle login errors
            this.errorMessage = 'Login failed. Please check your credentials.';
            console.error('Login failed:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  