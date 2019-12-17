<template>
    <button @click="$emit('klik')" class="button">
      <slot></slot>
    </button>
</template>
<style scoped>
.button{
    background: #dede; padding: 4px 8px; border: 1px; color: blue
}
</style>