<template>
  <div class="home">
    <HeadArea></HeadArea>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import HeadArea from "@/components/HeadArea.vue";

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    HeadArea,
  }
}
</script>
