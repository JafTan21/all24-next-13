export const Status = {
  Success: "Success",
  Error: "Error",

  Approved: 1,
  Rejected: 0,
  Pending: 2,

  Live: 3,
  Upcoming: 4,
  Closed: 5,

  Win: 6,
  Lose: 7,
  Refund: 8,
  Cashout: 9,
};

export const getStatusText = (status: number) => {
  switch (Number(status)) {
    case Status.Approved:
      return "Approved";
    case Status.Rejected:
      return "Rejected";
    case Status.Pending:
      return "Pending";
    case Status.Live:
      return "Live";
    case Status.Upcoming:
      return "Upcoming";
    case Status.Closed:
      return "Closed";
    case Status.Win:
      return "Win";
    case Status.Lose:
      return "Lose";
    case Status.Refund:
      return "Refund";
    case Status.Cashout:
      return "Cashout";
    default:
      return "Unknown";
  }
};
