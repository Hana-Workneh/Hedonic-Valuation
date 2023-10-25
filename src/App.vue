<template>
  <div id="app">
    <!-- <header>
      <h1>Hedonic Valuation App</h1>
    </header> -->
    <div class="max-w-xl mx-auto mt-8 p-6 bg-blue-100 text-blue-800 rounded-lg shadow-lg" v-if="!showLogin && !showSignUp">
      <!-- Card describing Hedonic Valuation -->
      <h2 class="text-2xl font-semibold mb-3">Hedonic Valuation</h2>
      <p class="text-gray-600">
        Hedonic valuation is a method used in real estate to estimate the value of a property based on its individual attributes. These attributes can include the number of bedrooms, age of the house, area of the house, number of floors, and many more.
      </p>
      <p class="text-gray-600 mt-3">
        It's a valuable tool for both buyers and sellers to understand how different characteristics of a property impact its price. By entering the property's attributes and coefficients, you can calculate the selling price and make more informed decisions.
      </p>
    </div>

    <main>
      <!-- Display the login or signup form only when their respective buttons are clicked -->
      <div v-if="showLogin && !userAuthenticated">
        <LogIn @authenticated="handleAuthentication" />
      </div>
      <div v-else-if="showSignUp && !userAuthenticated">
        <SignUp @authenticated="handleAuthentication" />
      </div>

      <!-- Display the main content if the user is authenticated -->
      <div v-else-if="userAuthenticated">
        <MainContent />
      </div>

      <!-- Display the choice to login or sign up -->
      <div v-else>
        <div class="mt-6">
          <button @click="showLogin = true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Login</button>
          <button @click="showSignUp = true" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import LogIn from './components/LogIn.vue';
import SignUp from './components/SignUp.vue';
import MainContent from './components/MainContent.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  data() {
    return {
      userAuthenticated: true,
      showLogin: false,
      showSignUp: false,
    };
  },
  methods: {
    handleAuthentication() {
      this.userAuthenticated = true;
    },
  },
  components: {
    LogIn,
    SignUp,
    MainContent,
    AppFooter
  },
};
</script>
