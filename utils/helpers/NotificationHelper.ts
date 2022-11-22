import { toast } from "react-toastify";
import Swal from "sweetalert2";

const config: any = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const successNotification = (msg: string) => toast.success(msg, config);
export const errorNotification = (msg: string) => toast.error(msg, config);
export const warnNotification = (msg: string) => toast.warn(msg, config);

export const adminSuccessNotification = (msg: string) =>
  toast.success(msg, {
    ...config,
    autoClose: 300,
  });

export const swalError = (msg: string, title: string = "Error!") => {
  Swal.fire({
    title: title,
    text: msg,
    icon: "error",
  });
};
