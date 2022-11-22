import { errorNotification, swalError } from "./NotificationHelper";

export default function ErrorHandler(
  err: any,
  withSwal: boolean = false
): void {
  const errors = err?.response?.data?.errors;

  const notificationFunction = withSwal ? swalError : errorNotification;

  if (!errors) {
    notificationFunction(err.message);
    return;
  }

  for (const e in errors) {
    for (var i = 0; i < errors[e].length; i++) {
      notificationFunction(errors[e][i]);
    }
  }
}
