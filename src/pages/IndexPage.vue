<template>
  <q-page padding class="q-px-xl">
    <!--  style="padding-left: 32px; padding-right: 32px" -->
    <!-- <q-btn @click="linkStore.createLink('https://google.cl')">Crear Link</q-btn> -->
    <addLinkComp class="q-mb-lg"></addLinkComp>
    <!-- <pre>
      {{ linkStore.links }}
    </pre> -->
    <template v-for="link in linkStore.links" :key="link._id">
      <linkCardComp :link="link"></linkCardComp>
    </template>
  </q-page>
</template>

<script setup>
import { useLinkStore } from "src/stores/link-store";
import addLinkComp from "src/components/addLinkComp.vue";
import linkCardComp from "src/components/linkCardComp.vue";
const linkStore = useLinkStore();

// NO FUNCIONA
// const {token, expiresIn, access, refreshToken} = userUserStore() //destructurando
</script>
