<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="">
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->

        <q-toolbar-title class="q-ml-md"> Short Link </q-toolbar-title>

        <q-btn
          v-if="userStore.token"
          class="q-mr-md"
          color="indigo-10"
          glossy
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
          glossy
          to="/protected"
          >Protected</q-btn
        >
        <q-btn v-if="userStore.token" color="red" glossy @click="logout"
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
