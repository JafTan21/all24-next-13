"use client";

import axios from "axios";
import React, { useState } from "react";
import UserPageWrapper from "../../../components/Wrappers/UserPageWrapper";
import ErrorHandler from "../../../utils/helpers/ErrorHandler";
import { LiveTimer } from "./LiveTimer";
import { SpinnerAnimation } from "./SpinnerAnimation";
import { TicketForm } from "./TicketForm";
import SpinnerRules from "./SpinnerRules";

import "./styles.scss";
import { SpinnerContext } from "./SpinnerContext";

export default function page() {
  const [disabled, disabledSet] = useState(false);

  const [data, dataSet] = useState<{
    win_number: number;
    loading: boolean;
  }>({
    win_number: 16,
    loading: false,
  });
  const get_result = () => {
    dataSet({
      loading: true,
      win_number: 16,
    });
    axios
      .get("/user/spinner/get-previous-result")
      .then((res) => {
        dataSet({
          win_number: res.data.win_number,
          loading: false,
        });
      })
      .catch(ErrorHandler);
  };

  return (
    <UserPageWrapper>
      <SpinnerContext.Provider
        value={{
          disabled,
          disabledSet,
          win_number: data.win_number,
          loading: data.loading,
        }}
      >
        <div id="spinner" className="w-full mx-auto casino-bg md:w-3/4">
          <div className="overlay"></div>
          <LiveTimer get_result={get_result} />
          <SpinnerAnimation />
          <TicketForm />
        </div>

        <div className="w-full mx-auto md:w-3/4" style={{ zIndex: 99 }}>
          <SpinnerRules />
        </div>
        {/* <Players /> */}
      </SpinnerContext.Provider>
    </UserPageWrapper>
  );
}
