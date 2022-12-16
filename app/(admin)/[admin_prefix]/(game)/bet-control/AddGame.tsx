import axios from "axios";
import React from "react";
import { BiPlus } from "react-icons/bi";
import { AdminInput, AdminSelect } from "../../../../../components/Html/Input";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import useGameTypes from "../../../../../hooks/api/admin/useGameTypes";
import useForm from "../../../../../hooks/useForm";
import useModal, { Modal } from "../../../../../hooks/useModal";
import { IGame } from "../../../../../libs/Models/Game";
import { Status } from "../../../../../libs/Status";

export default function AddGame({ addGame }: { addGame: (g: IGame) => void }) {
  const { gameTypes } = useGameTypes();

  const props = useModal({ title: "Add Game" });
  const { state, onChange, onSubmit, isSubmitting } = useForm<Partial<IGame>>({
    initialState: {
      team1: "",
      team2: "",
      short_description: "",
      game_type_id: 1,
      status: Status.Live,
      starting_time: "",
      ending_time: "",
    },
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/game", state)
          .then((res) => {
            addGame(res.data.game);
            resolve(res.data);
            props.closeModal();
          })
          .catch(reject);
      });
    },
  });

  return (
    <>
      <button
        onClick={props.openModal}
        className="bg-green-500 text-white flex-center-center px-3 py-2 rounded shadow"
      >
        <BiPlus /> Add game
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
            value={state.starting_time}
            name="starting_time"
            type="datetime-local"
            label="Starting Time"
            onChange={onChange}
          />
          <AdminInput
            value={state.ending_time}
            name="ending_time"
            type="datetime-local"
            label="Ending Time"
            onChange={onChange}
          />
          <SubmitButton isSubmitting={isSubmitting} text="Save" />
        </form>
      </Modal>
    </>
  );
}
