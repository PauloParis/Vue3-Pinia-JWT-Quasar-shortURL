<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-py-sm q-px-xl">
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->

        <q-toolbar-title class="no-padding"> Short Link </q-toolbar-title>

        <q-btn
          v-if="userStore.token"
          class="q-mr-md"
          color="indigo-10"
          rounded
          to="/"
          >Inicio</q-btn
        >
        <q-btn
          v-if="!userStore.token"
          color="indigo-10"
          glossy
          to="/login"
          class="q-mr-sm"
          >Login</q-btn
        >
        <q-btn
          v-if="!userStore.token"
          outline
          glossy
          color="indigo-10"
          to="/register"
          >Register</q-btn
        >
        <q-btn
          v-if="userStore.token"
          class="q-mr-md"
          color="cyan-10"
          rounded
          to="/protected"
          >Protected</q-btn
        >
        <q-btn v-if="userStore.token" color="red" rounded @click="logout"
          >Logout</q-btn
        >
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const router = useRouter();

const accessUser = async () => {
  await userStore.access();
  router.push("/");
};

const logout = async () => {
  await userStore.logout();
  router.push("/login");
};
</script>
