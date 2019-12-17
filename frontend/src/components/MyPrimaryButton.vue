<template>
  <button class="primary">
    <slot></slot>
  </button>
</template>
<style scoped>
.primary {
  background: #27ae60;
  padding: 4px 8px;
  border: 1px solid #fefefe;
  color: #333;
}
.primary:hover{
  background: blue;
  color: white
}
</style>