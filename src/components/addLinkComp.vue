<template>
  <div>
    <q-form @submit.prevent="addLink">
      <q-input
        v-model="link"
        label="Ingrese Link"
        :rules="[
          (val) => (val && val.trim() !== '') || 'Escribe algo por favor',
        ]"
      >
      </q-input>
      <q-btn
        class="q-mt-sm full-width"
        label="Agregar"
        color="primary"
        type="submit"
        :loading="loading"
      ></q-btn>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useLinkStore } from "src/stores/link-store";
import { useNotify } from "src/composables/notifyHook";

const linkStore = useLinkStore();
const { showNotify } = useNotify();

const link = ref("");
const loading = ref(false);

const addLink = async () => {
  loading.value = true;
  try {
    await linkStore.createLink(link.value);
    showNotify("Link agregado con exito", "green");
    link.value = "";
  } catch (error) {
    console.log(error.errors);
    if (error.errors)
      return error.errors.forEach((item) => {
        showNotify(item.msg);
      });
    showNotify("Error al agregar");
  } finally {
    loading.value = false;
  }
};
</script>
