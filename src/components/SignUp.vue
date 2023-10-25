<template>
  <div class="max-w-sm mx-auto mt-8 p-4 bg-white text-gray-800 rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold mb-4">Sign Up</h2>
    <form @submit.prevent="registerUser">
      <div class="mb-2">
        <label for="name" class="block text-sm font-medium text-gray-600">Name:</label>
        <input type="text" id="name" v-model="name" required class="form-input rounded-lg border border-gray-300 py-2 px-4">
      </div>
      <div class="mb-2">
        <label for="email" class="block text-sm font-medium text-gray-600">Email:</label>
        <input type="email" id="email" v-model="email" required class="form-input rounded-lg border border-gray-300 py-2 px-4">
      </div>
      <div class="mb-2">
        <label for="password" class="block text-sm font-medium text-gray-600">Password:</label>
        <input type="password" id="password" v-model="password" required class="form-input rounded-lg border border-gray-300 py-2 px-4">
        <!-- <p v-if="errorMessage" class="error">{{ errorMessage }}</p> -->
      </div>
      <div class="mb-4">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-600">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required class="form-input rounded-lg border border-gray-300 py-2 px-4">
      </div>
      <div>
        <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-4 py-2 px-4 rounded">Login</button>
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
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorMessage: '',
      };
    },
    methods: {
      registerUser() {
        const userData = {
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          
        };
        this.validatePassword();

        if (this.errorMessage) {
          return;
        }
      

  
        axios
          .post('https://97e2a7a5d2ba0d8694e821f9bf883e79.serveo.net/user/register', userData, {
            headers: {
              'Content-Type': 'application/json', // Specify content type as JSON
            },
          })
          .then(() => {
            // Handle the registration success
            console.log('User registered successfully');
            this.$emit('authenticated'); // Emit an event to notify the parent component
          })
          .catch(error => {
            // Handle registration errors
            this.errorMessage = 'Registration failed. Please check your information.';
            console.error('Registration failed:', error);
          });
      },
      validatePassword() {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(this.password)) {
        this.errorMessage = 'Invalid Password! Password must contain: 1 lowercase and uppercase letter, 1 digit, 1 special character, and must be a minimum of 8 characters.';
      } else {
        this.errorMessage = '';
      }
    },
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  