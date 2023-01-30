import moment from "moment";

export interface IOtp {
  otp: string;
  step: number;
  form_step: number;
  end: moment.Moment | undefined;
}
