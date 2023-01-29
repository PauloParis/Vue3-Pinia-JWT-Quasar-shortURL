import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "./user-store";

export const useLinkStore = defineStore("link", () => {
  const userStore = useUserStore();

  const links = ref([]);

  const createLink = async (longLink) => {
    try {
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
    }
  };

  const getLinks = async () => {
    try {
      const res = await api({
        method: "GET",
        url: "/links",
        headers: {
          authorization: "Bearer " + userStore.token,
        },
      });
      console.log(res.data);

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
    }
  };

  getLinks();

  return {
    createLink,
    links,
  };
});
