<template>
  <div class="app-container">
    <header class="app-header bg-blue-500 text-white p-4">
      <h2 class="text-3xl font-semibold bg-transparent">Hedonic Valuation Input</h2>
    </header>
    <main class="p-4">
      <div class="input-container mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2">Select a pricing model:</label>
        <select
          v-model="selectedModel"
          class="p-2 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:border-blue-500"
        >
          <option value="" disabled selected>Click here to select a pricing model</option>
          <option value="amuelResearch">Amanuel's Research</option>
          <option value="customAttributes">Custom Attributes and Coefficients</option>
        </select>
      </div>

      <!-- Amanuel's Research attributes -->
      <div v-if="selectedModel === 'amuelResearch'" class="research-container p-4 border border-gray-300 rounded-lg">
        <h2 class="text-xl font-semibold mb-2">Amanuel's Research Attributes</h2>
        <table class="w-full">
          <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr class="bg-gray-50">
              <th class="p-3 text-sm font-semibold tracking-wide text-left">Attribute</th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">Value</th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">Coefficient</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white" v-for="(coefficient, attribute) in amuelResearchAttributes" :key="attribute">
              <td class="p-3 text-sm text-gray-700">{{ attribute }}</td>
              <td class="p-3 text-sm text-gray-700">
                <input type="number" v-model="amuelResearchAttributes[attribute].value" class="w-full p-2 rounded-lg border border-gray-300" />
              </td>
              <td class="p-3 text-sm text-gray-700">{{ coefficient.coefficient }}</td>
            </tr>
          </tbody>
        </table>
        <button
          @click="calculateSellingPrice"
          v-if="selectedModel === 'amuelResearch'"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-full focus:outline-none"
        >
          Calculate Selling Price
        </button>
      </div>

      <!-- Custom attributes and coefficients input -->
      <div v-else-if="selectedModel === 'customAttributes'" class="custom-container p-4 border border-gray-300 rounded-lg">
        <h2 class="text-xl font-semibold mb-2">Custom Attributes and Coefficients</h2>
        <button @click="addCustomAttribute" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none">
          Add Custom Attribute
        </button>
        <div v-for="(customAttribute, index) in customAttributes" :key="index" class="custom-attribute mt-4">
          <input v-model="customAttributes[index].name" placeholder="Attribute Name" class="w-full p-2 rounded-lg border border-gray-300" />
          <input v-model="customAttributes[index].value" placeholder="Attribute Value" type="number" class="w-full p-2 rounded-lg border border-gray-300" />
          <input v-model="customAttributes[index].coefficient" placeholder="Attribute Coefficient" type="number" class="w-full p-2 rounded-lg border border-gray-300" />
        </div>
        <button
          @click="calculateSellingPrice"
          v-if="selectedModel === 'customAttributes' && customAttributes.length > 0"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none mt-4"
        >
          Calculate Selling Price
        </button>
        <!-- Conditionally render the "Save Custom Attributes" button -->
  <button
    @click="showTagNamePopup = true"
    v-if="selectedModel === 'customAttributes' && customAttributes.length > 0 && !showTagNamePopup"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none ml-4 mt-4"
  >
    Save Custom Attributes
  </button>

    <!-- Conditionally render the tag name input dialog with the "popup-card" class -->
    <div v-if="showTagNamePopup" class="popup-card tag-name-popup">
      <input v-model="customAttributesTag" placeholder="Enter Tag Name" class="form-input rounded-lg border border-gray-300 py-2 px-4">
      <div class="mt-4">
        <button @click="saveCustomAttributes" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
        <button @click="showTagNamePopup = false" class="bg-red-500 hover:bg-red-700 text-white font-bold ml-4 py-2 px-4 rounded">Cancel</button>
      </div>
    </div>

  </div>

      <!-- Display the calculated selling price -->
      <div v-if="sellingPrice !== null && calculateButtonClicked" class="result-container mt-6">
        <div class="result-card p-4 border border-gray-400 rounded-lg">
          <h2 class="text-xl font-semibold mb-2">Selling Price:</h2>
          <p class="text-2xl text-blue-700">{{ sellingPrice }}</p>
          <h3 class="text-lg font-semibold mt-4">Calculation:</h3>
          <p class="text-gray-700">{{ calculationDescription }}</p>
        </div>
      </div>
      

    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedModel: '', // 'amuelResearch' or 'customAttributes'
      amuelResearchAttributes: {
'Number of Bedrooms': { value: 1, coefficient: 224937.817 },
'Age of House': { value: 1, coefficient: 251411.040 },
'Area of the House': { value: 0, coefficient: 10008.165 },
'Number of Floors': { value: 1, coefficient: 715672.940 },
'Tenure Type': { value: 1, coefficient: 797385.288 },
'Parking Space': { value: 1, coefficient: 907257.172 },
'Green Area': { value: 1, coefficient: 782614.693 },
'Proximity to Taxi Stop': { value: 0, coefficient: 826206.788 },
'Type': { value: 0, coefficient: 359697.959 },
'Corner Place': { value: 0, coefficient: 781088.192 },
},
      customAttributes: [], // Array to store custom attributes and coefficients
      sellingPrice: null,
      beta0: 25312371.109,
      // New data property for the tag name input field
    customAttributesTag: '',
    savedCustomAttributes: [],
    savedCustomAttributesTag: '',
    showTagNamePopup: false, // Controls the visibility of the tag name pop-up
    calculateButtonClicked: false,
    };
  },
  computed: {
    calculationDescription() {
      // Generate the calculation description based on user's selections
      if (this.selectedModel === 'amuelResearch') {
        return this.generateAmanuelResearchCalculation();
      } else if (this.selectedModel === 'customAttributes') {
        return this.generateCustomCalculation();
      }
      return '';
    },

    hasCustomAttributes() {
      return this.customAttributes.some(attribute => attribute.name && attribute.value !== null);
    }

  },
  methods: {
    calculateSellingPrice() {
      // Calculate the selling price based on the selected model
      if (this.selectedModel === 'amuelResearch') {
        this.sellingPrice = this.calculateAmanuelResearchSellingPrice();
      } else if (this.selectedModel === 'customAttributes') {
        this.sellingPrice = this.calculateCustomSellingPrice();
      }
      this.calculateButtonClicked = true;
    },
    calculateAmanuelResearchSellingPrice() {
      // Calculate selling price based on Amanuel's Research attributes and coefficients
      const epsilon = 1; // Constant ε

      let sellingPrice = this.beta0 + epsilon; // Initialize with the constant ε

      for (const attribute in this.amuelResearchAttributes) {
        const { value, coefficient } = this.amuelResearchAttributes[attribute];
        sellingPrice += value * coefficient;
      }

      return sellingPrice;
    },
    calculateCustomSellingPrice() {
      // Calculate selling price based on custom attributes and coefficients
      // You can implement the calculation logic here based on the custom attributes and coefficients
      // This will depend on how you want to define the custom calculation.
      // This is a placeholder and should be implemented according to your requirements.
      let customSellingPrice = 0;
      for (const attribute of this.customAttributes) {
        customSellingPrice += attribute.value * attribute.coefficient;
      }
      return customSellingPrice;
    },
    generateAmanuelResearchCalculation() {
      // Generate a description of the Amanuel's Research calculation
      const epsilon = 1; // Constant ε

      let calculationDescription = `:\n`;
      calculationDescription += `Selling Price = ${this.beta0} + ${epsilon}`;

      for (const attribute in this.amuelResearchAttributes) {
        const { value, coefficient } = this.amuelResearchAttributes[attribute];
        calculationDescription += ` + (${coefficient} * ${value} ${attribute})`;
      }

      return calculationDescription;
    },
    generateCustomCalculation() {
    // Generate a description of the custom calculation
    let calDescription = `Custom Selling Price Calculation:\n`;

    for (const attribute of this.customAttributes) {
      calDescription += `+ (${attribute.coefficient} * ${attribute.value} ${attribute.name}) `;
    }

    return calDescription;
  },
    addCustomAttribute() {
      // Add a new custom attribute to the list
      this.customAttributes.push({ name: '', value: '', coefficient: '' });
    },
    saveCustomAttributes() {
    if (this.customAttributesTag) {
      // Create an object to represent the saved custom attributes and tag name
      const savedCustomAttributesItem = {
        tag: this.customAttributesTag,
        attributes: this.customAttributes,
      };

      // Add the saved custom attributes to your list
      this.savedCustomAttributes.push(savedCustomAttributesItem);

      // Reset the tag name input and hide the tag name pop-up
      this.customAttributesTag = '';
      this.showTagNamePopup = false;
    }
  },
  },

  created() {
    // Retrieve saved custom attributes from local storage on component creation
    const savedAttributes = localStorage.getItem('savedCustomAttributes');
    if (savedAttributes) {
      this.savedCustomAttributes = JSON.parse(savedAttributes);
      console.log('Saved custom attributes:', savedAttributes);
    }
  },
};
</script>

<style scoped>
/* Remove existing styles from the .app-container class */
.app-container {
  font-family: 'Poppins', sans-serif; /* Use your preferred font */
}

/* Add custom styles */
.app-header {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
}

/* Add more styles for various elements */
.input-container label {
  display: block;
  margin-bottom: 8px;
}

.research-container, .custom-container {
  margin-top: 20px;
}

.custom-attribute {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.result-container {
  text-align: center;
}

.result-card {
  padding: 20px;
}

.popup-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max-content;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  border-radius: 0.375rem;
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

</style>
