<template>
  <div style="padding: 40px;">
    <h1>Mail</h1>
    <form @submit.prevent="sendMail">
      <div class="form-group">
        Subject
        <input type="text" v-model="form.subject" />
      </div>

      <div class="form-group">
        To
        <input type="text" v-model="form.to" />
      </div>

      <div class="form-group">
        From
        <input type="text" v-model="form.from" />
      </div>

      <div class="form-group">
        Message
        <textarea v-model="form.message"></textarea>
      </div>
      <button type="submit">Send Mail</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    form: {
      to: "",
      from: "",
      subject: "",
      message: ""
    }
  }),
  methods: {
    async sendMail() {
      const response = await axios.post("mail", this.form);

      console.log(response.data);
    }
  }
};
</script>
