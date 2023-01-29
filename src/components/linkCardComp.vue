<template>
  <div>
    <q-card class="my-card q-mt-sm">
      <q-card-section>
        <div class="text-overline">
          {{ link.nanoLink }}
        </div>
        {{ link }}
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section>
        <q-btn
          @click="deleteLink(link._id)"
          flat
          round
          icon="mdi-trash-can-outline"
          color="red"
        ></q-btn>
        <q-btn
          @click="updateLink(link)"
          flat
          round
          icon="mdi-pencil-outline"
        ></q-btn>
        <q-btn @click="copyLink(link.nanoLink)" flat color="primary"
          >Copy</q-btn
        >
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useLinkStore } from "src/stores/link-store";
import { useQuasar } from "quasar";
import { useNotify } from "src/composables/notifyHook";

const linkStore = useLinkStore();
const $q = useQuasar();
const { errorNotify, successNotify } = useNotify();

defineProps({
  link: Object,
});

const copyLink = async (nanoLink) => {
  try {
    const path = `${process.env.FRONT_URI}/${nanoLink}`;
    await navigator.clipboard.writeText(path);
    successNotify("Se copió el nanolink");
  } catch (error) {
    console.log(error);
    errorNotify(error);
  }
};

const deleteLink = async (_id) => {
  $q.dialog({
    title: "Cuidado 💔",
    message: "¿Quieres eliminar el elemento?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    console.log(">>>> ok");
    try {
      await linkStore.removeLink(_id);
      successNotify("Se eliminó el link");
    } catch (error) {
      console.log(error);
      if (error.errors) {
        return error.errors.forEach((item) => {
          errorNotify(item.msg);
        });
      }
      errorNotify(error);
    }
  });
};

const updateLink = (link) => {
  $q.dialog({
    title: "Actualizar Link",
    message: "Actualiza aqui tu enlace",
    prompt: {
      model: link.longLink,
      type: "text", // optional
    },
    cancel: true,
    persistent: true,
  }).onOk(async (data) => {
    console.log(data); //modificado
    console.log(link); //original
    const newLink = { ...link, longLink: data }; //copio el objeto(link), en el newLink, y el longLink lo reemplazo con el link modificado, ya que long es la propiedad q se repite
    try {
      await linkStore.modifyLink(newLink);
      successNotify("Se actualizó el link");
    } catch (error) {
      if (error.errors) {
        return error.errors.forEach((item) => {
          errorNotify(item.msg);
        });
      }
      errorNotify(error);
    }
  });
};
</script>
