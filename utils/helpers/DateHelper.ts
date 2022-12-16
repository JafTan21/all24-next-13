import moment from "moment";
export const DateFormat: string = "YYYY-MM-DDTHH:mm:SS";
export const DateFormatShow: string = "YYYY-MM-DD HH:mm:SS";

const FormatDate = (date: string = "", format: string = DateFormat) => {
  return date ? moment(date).format(format) : "";
};

export default FormatDate;
