import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiEdit, BiPlus } from "react-icons/bi";
import {
  AdminInput,
  AdminSelect,
} from "../../../../../../components/Html/Input";
import SubmitButton from "../../../../../../components/Html/SubmitButton";
import ToggleButton from "../../../../../../components/Html/ToggleButton";
import useGameTypes from "../../../../../../hooks/api/admin/useGameTypes";
import useForm from "../../../../../../hooks/useForm";
import useModal, { Modal } from "../../../../../../hooks/useModal";
import { IGame } from "../../../../../../libs/Models/Game";
import { Status } from "../../../../../../libs/Status";
import FormatDate from "../../../../../../utils/helpers/DateHelper";

export default function EditGame({
  initialGameSet,
  initialGame,
}: {
  initialGame: IGame;
  initialGameSet: (g: IGame) => void;
}) {
  const { gameTypes } = useGameTypes();

  const props = useModal({ title: "Edit Game" });
  const { state, onChange, onSubmit, isSubmitting, updateState } = useForm<
    Partial<IGame>
  >({
    initialState: {
      ...initialGame,
      live_score: "",
    },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put(`/admin/game/${state.id}`, state)
          .then((res) => {
            initialGameSet(res.data.game);
            resolve(res.data);
            props.closeModal();
          })
          .catch(reject);
      });
    },
  });

  useEffect(() => updateState(initialGame), [initialGame]);

  return (
    <>
      <button onClick={props.openModal} className="admin-game-btn bg-blue-600">
        <span className="flex-center-center">
          <BiEdit /> Edit
        </span>
      </button>

      <Modal {...props}>
        <form onSubmit={onSubmit}>
          <AdminInput
            value={state.team1}
            name="team1"
            label="Team 1"
            onChange={onChange}
            required={true}
          />
          <AdminInput
            value={state.team2}
            name="team2"
            label="Team 2"
            onChange={onChange}
            required={true}
          />
          <AdminInput
            value={state.short_description}
            name="short_description"
            label="Short Description"
            onChange={onChange}
          />
          <AdminSelect
            value={state.game_type_id}
            name="game_type_id"
            label="Game Type"
            onChange={onChange}
            required={true}
          >
            <>
              {gameTypes?.map((type) => {
                return (
                  <option value={type.id} key={type.id}>
                    {type.name}
                  </option>
                );
              })}
            </>
          </AdminSelect>
          <AdminSelect
            value={state.status}
            name="status"
            label="Game Status"
            onChange={onChange}
            required={true}
          >
            <>
              <option value={Status.Live}>Live</option>
              <option value={Status.Upcoming}>Upcoming</option>
            </>
          </AdminSelect>
          <AdminInput
            value={FormatDate(state.starting_time)}
            name="starting_time"
            type="datetime-local"
            label="Starting Time"
            onChange={onChange}
          />
          <AdminInput
            value={FormatDate(state.ending_time)}
            name="ending_time"
            type="datetime-local"
            label="Ending Time"
            onChange={onChange}
          />

          <AdminInput
            value={state.total_limit}
            name="total_limit"
            label="Total Limit"
            onChange={onChange}
          />
          <AdminInput
            value={state.live_score}
            name="live_score"
            label="Live Score"
            onChange={onChange}
          />

          <AdminInput
            value={state.youtube_embed_link}
            name="youtube_embed_link"
            label="Youtube Embed Link"
            onChange={onChange}
          />
          <ToggleButton
            on="On"
            off="Off"
            isActive={!!state.youtube_embed_on}
            onClick={(e) => {
              updateState({
                youtube_embed_on: !state.youtube_embed_on,
              });
            }}
            withDiv={true}
            classNames="p-2"
            label="YouTube Embed:"
          />

          <SubmitButton isSubmitting={isSubmitting} text="Update" />
        </form>
      </Modal>
    </>
  );
}
