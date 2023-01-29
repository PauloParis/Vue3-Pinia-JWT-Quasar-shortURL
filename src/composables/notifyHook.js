import { useQuasar } from "quasar";

export const useNotify = () => {
  const $q = useQuasar();

  // NEGATIVE
  const errorNotify = (message = "Error de servidor") => {
    $q.notify({
      message,
      color: "negative",
      icon: "report_problem",
    });
  };

  // POSITIVE
  const successNotify = (message = "Exito") => {
    $q.notify({
      message,
      color: "green",
      icon: "report_problem",
    });
  };

  // POSITIVE & NEGATIVE
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

  return { errorNotify, successNotify, showNotify };
};
