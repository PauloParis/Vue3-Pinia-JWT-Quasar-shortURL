import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "./user-store";
import { useQuasar } from "quasar";

export const useLinkStore = defineStore("link", () => {
  const userStore = useUserStore();
  const links = ref([]);
  const $q = useQuasar();

  const createLink = async (longLink) => {
    try {
      $q.loading.show();
      const res = await api({
        method: "POST",
        url: "links",
        headers: {
          authorization: "Bearer " + userStore.token,
        },
        data: {
          longLink,
        },
      });
      //console.log(res.data);
      links.value.push(res.data.newLink);
    } catch (error) {
      //console.log(error.response?.data || error);
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  const getLinks = async () => {
    try {
      $q.loading.show();
      const res = await api({
        method: "GET",
        url: "/links",
        headers: {
          authorization: "Bearer " + userStore.token,
        },
      });
      //console.log(res.data);

      //map devuelve la misma cantidad de elementos

      //version 1 - trae todas las propiedades
      //links.value = res.data.links.map((item) => item);

      //version 2 - especifico q propiedades traigo
      /* links.value = res.data.links.map((item) => {
        return {
          longLink: item.longLink,
          nanoLink: item.nanoLink,
        };
      }); */

      //version 3 (spread operation) - destructurando - trae lo mismo que la version 1
      links.value = [...res.data.links];
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      $q.loading.hide();
    }
  };

  const removeLink = async (_id) => {
    try {
      $q.loading.show();
      await api({
        method: "DELETE",
        url: `/links/${_id}`,
        headers: {
          authorization: "Bearer " + userStore.token,
        },
      });

      links.value = links.value.filter((item) => item._id !== _id); //devuelve todo lo que sea diferente al _id
    } catch (error) {
      console.log(error.response?.data || error);
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  const modifyLink = async (newLink) => {
    try {
      $q.loading.show();
      await api({
        method: "PATCH",
        url: `/links/${newLink._id}`,
        headers: {
          authorization: "Bearer " + userStore.token,
        },
        data: {
          longLink: newLink.longLink,
        },
      });

      links.value = links.value.map((item) =>
        item._id === newLink._id ? newLink : item
      );
    } catch (error) {
      console.log(error.response?.data || error);
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  getLinks();

  return {
    createLink,
    removeLink,
    modifyLink,
    links,
  };
});
