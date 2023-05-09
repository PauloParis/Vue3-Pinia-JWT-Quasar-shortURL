<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-6 col-lg-4 text-center">
      <h3 class="text-blue-grey-10 text-weight-bolder">Login</h3>
      <div class="bordes">
        <q-form @submit.prevent="handleSubmit" class="q-ma-lg">
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
            :type="isPwd ? 'password' : 'text'"
            label="Ingrese password"
            :rules="[(val) => (val && val.length > 5) || 'Minimo 6 caracteres']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-btn
            class="q-mt-md"
            label="Login"
            color="primary"
            glossy
            type="submit"
          ></q-btn>
        </q-form>
      </div>
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

const email = ref("admin@test.com");
const password = ref("123456");
const isPwd = ref(true);

const handleSubmit = async () => {
  try {
    await userStore.access(email.value, password.value);
    router.push("/");
    email.value = "";
    password.value = "";
  } catch (error) {
    console.log("error", error);
    //alertDialogBackend(error.error);
    if (error.error) {
      alertDialogBackend(error.error);
    } else if (error.errors[0].msg) {
      alertDialogBackend(error.errors[0].msg);
    } else {
      alertDialogBackend();
    }
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
