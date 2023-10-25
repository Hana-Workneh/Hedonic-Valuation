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
      axios.post('https://hedonic-backend.onrender.com/user/login', {
        email: this.email,
        password: this.password,
      })
      .then(response => {
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
  