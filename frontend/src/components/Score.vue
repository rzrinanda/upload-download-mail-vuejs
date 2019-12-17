<template>
  <div>
    <h1>
      {{label}}
    </h1>
    {{value}}
    <div>
      <my-button @klik="minus()">-</my-button>
      <my-button @klik="plus()">+</my-button>
    </div>
  </div>
</template>
<script>
import MyButton from "./MyButton";
export default {
  components: {
    MyButton
  },
  props: ["value", "label"],
  methods: {
    plus() {
      this.$emit("update", this.value + 1);
    },
    minus() {
      this.$emit("update", this.value - 1);
    }
  }
};
</script>