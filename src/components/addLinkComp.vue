<template>
  <div>
    <q-form class="row items-center" @submit.prevent="addLink" ref="formAdd">
      <q-input
        class="col-12 col-sm-9 q-mt-md no-padding"
        rounded
        outlined
        bg-color="white"
        v-model="link"
        label="Ingrese Link"
        :rules="[
          (val) => (val && val.trim() !== '') || 'Escribe algo por favor',
        ]"
        lazy-rules
      >
      </q-input>
      <div class="q-mx-sm"></div>
      <q-btn
        class="col-12 col-sm q-mt-md q-pa-sm"
        rounded
        label="Agregar"
        glossy
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
const formAdd = ref(null);

const addLink = async () => {
  loading.value = true;
  try {
    await linkStore.createLink(link.value);
    showNotify("Link agregado con exito", "green");
    link.value = "";
    formAdd.value.resetValidation();
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
