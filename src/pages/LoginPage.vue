<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm col-md-5">
      <h3>Login</h3>
      <q-form @submit.prevent="handleSubmit">
        <q-input
          v-model="email"
          type="email"
          label="Ingrese email"
          :rules="[
            (val) =>
              (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) ||
              'Escriba un email correcto',
          ]"
        >
        </q-input>
        <q-input
          v-model="password"
          type="password"
          label="Ingrese password"
          :rules="[(val) => (val && val.length > 5) || 'Minimo 6 caracteres']"
        >
        </q-input>
        <q-btn label="Login" type="submit"></q-btn>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "src/stores/user-store";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();

const userStore = useUserStore();
const router = useRouter();

const email = ref("paulo@test.com");
const password = ref("123456");

const handleSubmit = async () => {
  try {
    await userStore.access(email.value, password.value);
    router.push("/");
    email.value = null;
    password.value = null;
  } catch (error) {
    console.log("error", error);
    alertDialogBackend(error.error);
  }
};

const alertDialogBackend = (message = "Error en el servidor") => {
  // "Error en el servidor" -> mensaje por defecto
  $q.dialog({
    title: "Error",
    message,
  });
};
</script>
