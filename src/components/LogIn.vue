<template>
  <div>
    <!-- Your login form content here -->
    <router-link to="/maincontent"></router-link>
  </div>
  <button @click="goBack"
  class="absolute top-0 left-0 m-2 px-4 py-2  bg-blue-500 text-white rounded-lg hover:bg-blue-700"
>
  Back
</button>
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
    goBack() {
      this.$router.go(-1); // Go back to the previous page but with vue routing
      // Use JavaScript's built-in history to navigate back
      // window.history.go(-1);
    },
    loginUser() {
      axios.post('https://hedonic-backend.onrender.com/user/login', {
        email: this.email,
        password: this.password,
      })
      .then(response => {
        this.$emit('authenticated'); // Trigger authenticated event
        const token = response.data.token;
        // Store the token in localStorage
        localStorage.setItem('token', token);
        // Redirect to the main content or perform other actions as needed
        this.$router.push('/maincontent');
      })
      .catch(error => {
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
  