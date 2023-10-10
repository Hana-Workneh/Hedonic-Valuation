<template>
    <div class="app-container">
      <header class="app-header">
        <h2>Hedonic Valuation Input</h2>
      </header>
      <main>
        <div class="input-container">
          <label>Select a pricing model:</label>
          <select v-model="selectedModel">
            <option value="amuelResearch">Amanuel's Research</option>
            <option value="customAttributes">Custom Attributes and Coefficients</option>
          </select>
        </div>
  
        <!-- Display Amanuel's Research table if selectedModel is 'amuelResearch' -->
        <div v-if="selectedModel === 'amuelResearch'" class="research-container">
          <h2>Amanuel's Research Attributes</h2>
          <table class="research-table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
                <th>Coefficient</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(coefficient, attribute) in amuelResearchAttributes" :key="attribute">
                <td>{{ attribute }}</td>
                <td>
                  <input type="number" v-model="amuelResearchAttributes[attribute].value" />
                </td>
                <td>{{ coefficient.coefficient }}</td>
              </tr>
            </tbody>
          </table>
          <button
            @click="calculateSellingPrice"
            v-if="selectedModel === 'amuelResearch'"
            class="calculate-button"
          >
            Calculate Selling Price
          </button>
        </div>
  
        <!-- Display custom attributes and coefficients input if selectedModel is 'customAttributes' -->
        <div v-else-if="selectedModel === 'customAttributes'" class="custom-container">
          <h2>Custom Attributes and Coefficients</h2>
          <button @click="addCustomAttribute" class="add-attribute-button">Add Custom Attribute</button>
          <div v-for="(customAttribute, index) in customAttributes" :key="index" class="custom-attribute">
            <input
              v-model="customAttributes[index].name"
              placeholder="Attribute Name"
            />
            <input
              v-model="customAttributes[index].value"
              placeholder="Attribute Value"
              type="number"
            />
            <input
              v-model="customAttributes[index].coefficient"
              placeholder="Attribute Coefficient"
              type="number"
            />
          </div>
          <button
            @click="calculateSellingPrice"
            v-if="selectedModel === 'customAttributes' && customAttributes.length > 0"
            class="calculate-button"
          >
            Calculate Selling Price
          </button>
        </div>
  
        <!-- Display the calculated selling price -->
        <div v-if="sellingPrice !== null" class="result-container">
          <div class="result-card">
            <h2>Selling Price:</h2>
            <p>{{ sellingPrice }}</p>
            <h3>Calculation:</h3>
            <p>{{ calculationDescription }}</p>
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
        beta0: 25312371.109
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
      let calDescription = `Custom Calculation:\n`;

      for (const attribute of this.customAttributes) {
        calDescription += ` (${attribute.coefficient} * ${attribute.value} ${attribute.name})`;
      }

      return calDescription;
    },
      addCustomAttribute() {
        // Add a new custom attribute to the list
        this.customAttributes.push({ name: '', value: '', coefficient: '' });
      },
    },
  };
  </script>

  <style scoped>
  .app-container {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .app-header {
    background-color: #4197f3;
    border-radius: 10px;
    color: white;
    padding: 10px;
    font-size: 20px;
    margin-bottom: 50px;
  }
  
  .input-container {
    margin-bottom: 20px;
  }
  
  .research-container {
    border: 1px solid #ccc;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
  }
  
  .research-table {
    width: 100%;
    margin-top: 10px;
  }
  
  .calculate-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .custom-container {
    margin-top: 20px;
  }
  
  .add-attribute-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-bottom: 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .custom-attribute {
    display: flex;
    margin-bottom: 10px;
  }
  
  .result-container {
    margin-top: 20px;
  }
  
  .result-card {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
  }
  </style>
  





