<template>
    <div>
      <button @click="toggleHelperText">Toggle Helper Text</button>
      <div v-if="showHelperText">
        <h2>Search Instructions</h2>

        <h3>Partial Text Searches</h3>
        <p><strong>Name:</strong> <code>n:[text]</code> - Example: <code>n:dragon</code><br>
        <strong>Body Text:</strong> <code>b:[text]</code> - Example: <code>b:fire</code><br>
        <strong>Artist:</strong> <code>a:[text]</code> - Example: <code>a:smith</code><br>
        <strong>Flavor Text:</strong> <code>f:[text]</code> - Example: <code>f:legend</code></p>

        <h3>Integer Searches</h3>
        <p>Perform numeric comparisons using the following operators: <code>:</code>, <code>=</code>, <code>&gt;</code>, <code>&ge;</code>, <code>&lt;</code>, <code>&le;</code>.<br>
        <strong>Cost:</strong> <code>c[operator][number]</code> - Example: <code>c&gt;4</code><br>
        <strong>Willpower (HP):</strong> <code>w[operator][number]</code> - Example: <code>w&le;3</code><br>
        <strong>Strength:</strong> <code>s[operator][number]</code> - Example: <code>s=5</code></p>

        <h3>Key Letter or Exact Text Matches</h3>
        <p>Search for exact matches or by key letters:<br>
        <strong>Ink Color:</strong> <code>i:[letter/text]</code> - Examples: <code>i:g</code>, <code>i:green</code><br>
        <strong>Rarity:</strong> <code>r:[letter/text]</code> - Examples: <code>r:r</code>, <code>r:rare</code><br>
        <strong>Type:</strong> <code>t:[letter/text]</code> - Examples: <code>t:c</code>, <code>t:creature</code></p>

        <h3>Specific Searches</h3>
        <p>Search for specific attributes:<br>
        <strong>Set:</strong> <code>e:[set]</code> - Exact match only. Example: <code>e:XYZ</code><br>
        <strong>Inkable:</strong> <code>z:yes</code> or <code>z:no</code> - Search for inkable cards. Example: <code>z:yes</code></p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showHelperText: false,
      };
    },
    methods: {
      toggleHelperText() {
        this.showHelperText = !this.showHelperText;
      },
    },
  };
  </script>