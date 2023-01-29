import { useQuasar } from "quasar";

export const useNotify = () => {
  const $q = useQuasar();

  const showNotify = (
    message = "Error de servidor",
    color = "negative",
    icon = "report_problem"
  ) => {
    $q.notify({
      message,
      color,
      //icon: icon && null, //arreglar
    });
  };

  return { showNotify };
};
