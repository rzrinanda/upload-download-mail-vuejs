<template>
  <div>
    <div>
      <!-- <img src="http://localhost:3000/download" alt=""> -->
    </div>
    <form @submit.prevent="upload">
      <dl>
        <dd v-for="(item, index) in items" :key="index">
          <div>
            Title:
            <input type="text" v-model="item.name" />
          </div>
          <div>
            <input
              type="file"
              :ref="item.file"
              @change="updateFile(item, $event)"
              accept="application/pdf, image/jpeg"
            />
          </div>
          <!-- <img :src="item.imagePreview" :ref="'imgPreview'+ index" /> -->
          <object :data="item.preview" style="width:600px; height:350px"></object>
        </dd>
      </dl>
      <button type="button" @click="addMore">Add more</button>
      <button type="submit">Upload</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    items: [
      {
        name: "",
        file: null,
        // showPreview: false,
        preview: ""
        // imagePreview: "",
        // pdfPreview: "",
      }
    ]
  }),
  methods: {
    updateFile(item, $event) {
      item.file = $event.target.files[0];
    },
    addMore() {
      this.items.push({
        name: "",
        file: null
      });
    },
    async upload() {
      let formData = new FormData();
      this.items.forEach(item => {
        formData.append("name", item.name);
        // item.file = this.$refs.files;
        formData.append("file", item.file);
      });
      console.log(formData)
      const response = await axios.post("upload", formData);
      console.log(response);

      if (response.statusText === "OK") {
        console.log("OK");
        this.items.forEach(item => {
          console.log(item.file);
          let originalFileURL = URL.createObjectURL(item.file);
          item.preview = originalFileURL;
          //   let reader = new FileReader();
          //   if (item.file.type === "application/pdf") {
          //     let originalFileURL = URL.createObjectURL(item.file);
          //     item.pdfPreview = originalFileURL;
          //   } else {
          //     reader.addEventListener(
          //       "load",
          //       function() {
          //         item.showPreview = true;
          //         item.imagePreview = reader.result;
          //       }.bind(this),
          //       false
          //     );
          //   }
          //   if (item.file) {
          //     console.log("adsad");
          //     if (/\.(jpe?g|png|gif)$/i.test(item.file.name)) {
          //       reader.readAsDataURL(item.file);
          //     }
          //   }
        });
      }
    }
  }
};
</script>