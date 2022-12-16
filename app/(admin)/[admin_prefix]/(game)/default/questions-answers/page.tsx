"use client";

import axios from "axios";
import React, { useState } from "react";
import {
  AdminInput,
  AdminSelect,
} from "../../../../../../components/Html/Input";
import SubmitButton from "../../../../../../components/Html/SubmitButton";
import { AdminTable } from "../../../../../../components/Html/Table";
import Td from "../../../../../../components/Html/Td";
import ToggleButton from "../../../../../../components/Html/ToggleButton";
import AdminPageWrapper from "../../../../../../components/Wrappers/AdminPageWrapper";
import useGameTypes from "../../../../../../hooks/api/admin/useGameTypes";
import useForm from "../../../../../../hooks/useForm";
import useSearch from "../../../../../../hooks/useSearch";
import { IRefresh } from "../../../../../../libs/interfaces";
import { IAutoQuestion } from "../../../../../../libs/Models/AutoQuestionAnswer";
import { AutoAnswers } from "./AutoAnswers";

const TableHeader = () => {
  return (
    <tr>
      <Td className="p-4 w-4">#</Td>
      <Td>Game Name</Td>
      <Td>Question</Td>
      <Td>Answers</Td>
      <Td>actions</Td>
    </tr>
  );
};

export default function page() {
  const { onSubmit, isSubmitting, state, onChange, updateState } = useForm({
    initialState: {
      game_name: "",
      question: "",
    },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/AutoQuestion", state)
          .then((res) => {
            refresh();
            resolve(res.data);
            updateState({ question: "" });
          })
          .catch(reject);
      });
    },
  });

  const { data, refresh } = useSearch<IAutoQuestion[]>({
    url: "/admin/AutoQuestion",
    noPagination: true,
    params: {
      game_name: state.game_name,
    },
  });

  const [show, showSet] = useState(false);

  const { gameTypes } = useGameTypes();

  return (
    <AdminPageWrapper>
      <div className="bg-white p-2 m-2">
        <ToggleButton
          isActive={show}
          onClick={(e) => showSet(!show)}
          on="Show"
          off="Hide"
        />
        <AdminSelect
          value={state.game_name}
          name="game_name"
          label="Game Name"
          onChange={onChange}
          required={true}
          enableDefault={true}
        >
          <>
            {gameTypes?.map((type) => {
              return (
                <option value={type.name} key={type.id}>
                  {type.name}
                </option>
              );
            })}
          </>
        </AdminSelect>

        {show && (
          <form onSubmit={onSubmit}>
            <AdminInput
              value={state.question}
              name="question"
              onChange={onChange}
              label="Question"
            />

            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        )}

        <AdminTable header={<TableHeader />}>
          {data &&
            data
              .filter(
                (question) =>
                  question.game_name == state.game_name || state.game_name == ""
              )
              .map((question, idx) => (
                <Maker
                  refresh={refresh}
                  show={show}
                  row={question}
                  key={question.id}
                  idx={idx}
                />
              ))}
        </AdminTable>
      </div>
    </AdminPageWrapper>
  );
}

const Maker = ({
  row: question,
  show,
  refresh,
  idx,
}: {
  row: IAutoQuestion;
  show: boolean;
  idx: number;
} & IRefresh) => {
  const { isSubmitting, submitWithoutForm } = useForm({
    initialState: null,
    shouldConfirmBeforeSubmitting: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .delete("/admin/AutoQuestion/" + question.id)
          .then((res) => {
            refresh();
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  const {
    submitWithoutForm: toogle,
    state,
    updateState,
  } = useForm({
    initialState: {
      is_active: question.is_active,
    },
    shouldConfirmBeforeSubmitting: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/AutoQuestion/" + question.id, {
            game_name: question.game_name,
          })
          .then((res) => {
            refresh();
            resolve(res.data);
            updateState({ is_active: !state.is_active });
          })
          .catch(reject);
      });
    },
  });

  return (
    <tr className={idx % 2 == 0 ? "bg-white" : "bg-gray-200"}>
      <Td>
        {question.id}
        <input checked={state.is_active} onChange={toogle} type="checkbox" />
      </Td>
      <Td>{question.game_name}</Td>
      <Td>{question.question}</Td>
      <Td>
        {question.auto_answers && (
          <AutoAnswers
            show={show}
            auto_question_id={question.id}
            initialAnswers={question.auto_answers}
          />
        )}
      </Td>
      <Td>
        <SubmitButton
          isSubmitting={isSubmitting}
          onClick={submitWithoutForm}
          classNames="text-white rounded bg-red-500 p-2"
          text="delete"
        />
      </Td>
    </tr>
  );
};
