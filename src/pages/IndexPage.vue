<template>
  <q-page padding>
    <q-btn @click="userStore.access">Ingresar</q-btn>
    <q-btn @click="userStore.logout">Cerrar Sesión</q-btn>
    <q-btn @click="createLink">Crear Link</q-btn>
    {{ userStore.token }} - {{ userStore.expiresIn }}
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios.js";
import { useUserStore } from "src/stores/user-store.js";

const userStore = useUserStore();

// NO FUNCIONA
// const {token, expiresIn, access, refreshToken} = userUserStore() //destructurando

//userStore.refreshToken();

const createLink = async () => {
  try {
    const res = await api({
      method: "POST",
      url: "/links",
      headers: {
        Authorization: "Bearer " + userStore.token,
      },
      data: {
        longLink: "https://quasar.dev/vue-components/dialog",
      },
    });

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
</script>
