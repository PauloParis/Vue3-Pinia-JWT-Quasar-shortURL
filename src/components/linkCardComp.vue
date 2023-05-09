<template>
  <div>
    <q-card class="my-card q-mt-md">
      <q-card-section>
        <div class="text-overline">
          <span class="text-primary">id: </span>{{ link.nanoLink }}
        </div>
        <span class="text-primary">link: </span> {{ link.longLink }}
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
        <q-btn
          icon="mdi-eye-outline"
          @click="showLink(link.nanoLink)"
          round
          flat
          color="primary"
        ></q-btn>
        <p
          v-if="show"
          style="display: inline"
          class="text-overline bordes q-pa-sm q-ml-sm"
        >
          {{ path }}
        </p>
        <q-btn
          v-if="show"
          @click="copyLink"
          color="green"
          rounded
          outline
          class="q-ml-sm"
          >Copiar</q-btn
        >
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useLinkStore } from "src/stores/link-store";
import { useQuasar } from "quasar";
import { useNotify } from "src/composables/notifyHook";
import { ref } from "vue";

const linkStore = useLinkStore();
const $q = useQuasar();
const { errorNotify, successNotify } = useNotify();
const path = ref("");
const show = ref(false);

defineProps({
  link: Object,
});

function showLink(nanoLink) {
  path.value = `${process.env.FRONT_URI}/${nanoLink}`;
  show.value = !show.value;
  //return path.value;
}

const copyLink = async (/* nanoLink */) => {
  try {
    //path.value = `${process.env.FRONT_URI}/${nanoLink}`;
    /* const pathlink = showLink(nanoLink);
    console.log(pathlink); */
    await navigator.clipboard.writeText(path.value);
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
