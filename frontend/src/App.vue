<template>
  <div style="padding: 40px;">
    <ul>
      <li>
        <router-link to="/mail">Mail</router-link>
      </li>
      <li>
        <router-link to="/upload">Upload</router-link>
      </li>
      <li>
        <router-link to="/show-pdf">Show PDF</router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {};
</script>
