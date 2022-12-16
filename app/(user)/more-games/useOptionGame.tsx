"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import AppConfig from "../../../app.config";
import SubmitButton from "../../../components/Html/SubmitButton";
import UserPageWrapper from "../../../components/Wrappers/UserPageWrapper";
import useForm from "../../../hooks/useForm";
import ErrorHandler from "../../../utils/helpers/ErrorHandler";
import {
  errorNotification,
  successNotification,
} from "../../../utils/helpers/NotificationHelper";
import Notice from "./Notice";
import OptionButton from "./OptionButton";
import useWheel from "./useWheel";

interface IOption {
  name: string;
  background?: string;
}

type Props = {
  options: IOption[];
  GameName: string;
  images: { [key: string]: string };
  isSpinner?: boolean;
  text_required?: boolean;
};

const useOptoinGame = ({
  options,
  images,
  GameName,
  text_required,
  isSpinner,
}: Props) => {
  const [setting, settingSet] = useState({
    rate: 0,
    min: 0,
    max: 0,
    notice: "",
  });
  const [image, setImage] = useState(images.logo);

  const { state, updateState, isSubmitting, onSubmit } = useForm({
    initialState: {
      game_name: GameName,
      selected_option: options[0].name,
      amount: 0,
    },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        if (shouldReset) {
          reset();
          reject();
          return;
        }

        if (isSpinner) startSpin();
        else setImage(images.playing);

        setTimeout(
          () => {
            axios
              .post(`/user/option-game`, state)
              .then((res) => {
                if (isSpinner) {
                  Object.entries(options).forEach(([key, option], idx) => {
                    if (option.name == res.data.winning_option) {
                      animateTo(idx);
                    }
                  });
                } else {
                  Object.entries(images).forEach(([key, value]) => {
                    if (key == res.data.winning_option) {
                      setImage(value);
                    }
                  });
                }

                setTimeout(
                  () => {
                    if (res.data.winning_option == state.selected_option) {
                      successNotification(res.data.message);
                    } else {
                      errorNotification(res.data.message);
                    }

                    updateState({ amount: 0 });
                    resolve(res.data);
                  },
                  isSpinner ? (spinningTime - 1) * 1000 : 1
                );
              })
              .catch((e) => {
                if (isSpinner) stopSpin();
                else setImage(images.logo);
                reject();
              });
          },
          isSpinner ? 1 : AppConfig.waiting_time
        );
      });
    },
  });

  const {
    Wheel,
    reset,
    shouldReset,
    startSpin,
    stopSpin,
    spinningTime,
    animateTo,
  } = useWheel({
    items: options.map((op) => {
      return op.name;
    }),
  });

  useEffect(() => {
    // get rate from server
    axios
      .get(`/user/option-game/setting`, {
        params: {
          game_name: GameName,
        },
      })
      .then((res) => {
        settingSet({
          rate: res.data.rate,
          min: res.data.min,
          max: res.data.max,
          notice: res.data.notice,
        });
      })
      .catch(ErrorHandler);
  }, []);

  const getImageFromName = (name: string) => {
    return images[name] ?? "";
  };

  const RandomStyleSet = useMemo(
    () => OptionGameStyles[Math.floor(Math.random() * OptionGameStyles.length)],
    []
  );

  const OptionGame = (
    <UserPageWrapper>
      <form onSubmit={onSubmit} className={`${RandomStyleSet} border-4`}>
        <p className="bg-gray-900 text-white font-bold text-2xl w-full text-center py-2">
          {GameName}
        </p>
        <div className="p-2 mb-4 ">
          <section className="w-full flex justify-center items-center flex-col">
            <div className="mb-2 ">
              {!isSpinner && <img className="h-36 w-auto mt-4" src={image} />}
              {isSpinner && Wheel}
            </div>
            <div className="mt-5 mb-3 text-xl">Select you option:</div>
            <div className="flex justify-around w-full items-center flex-wrap mb-4">
              {options.map((option: IOption, idx) => {
                return (
                  <OptionButton
                    image={getImageFromName(option.name)}
                    total={options.length}
                    key={`${idx}-option`}
                    selected={state.selected_option}
                    setter={(value) => updateState({ selected_option: value })}
                    name={option.name}
                    background={option.background}
                    text_required={text_required}
                  />
                );
              })}
            </div>
            <div className=" text-xl flex flex-col mt-2">
              <label>Amount:</label>
              <input
                required
                value={state.amount}
                type="number"
                onChange={(e) =>
                  updateState({ amount: Number(e.target.value) || undefined })
                }
                className="text-black px-2 py-1 bg-gray-100 shadow-md focus:outline-none  rounded "
                placeholder="Enter amount:"
              />

              <div className="flex flex-wrap items-center justify-center mt-3">
                {[
                  20, 100, 200, 500, 1000, 1500, 2000, 3000, 5000, 7000, 10000,
                ].map((num) => {
                  return (
                    <button
                      onClick={() => updateState({ amount: num })}
                      type="button"
                      key={Math.random()}
                      className="px-2 py-0.5 m-1 text-white rounded bg-lime-600"
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-8 mb-4">
              <span className="text-2xl">Possible win ({setting.rate}):</span>
              <b className="ml-2 text-3xl">
                ${Number(state.amount) * setting.rate}
              </b>
            </div>

            <SubmitButton
              isSubmitting={isSubmitting}
              text={shouldReset ? "Reset" : "Play Now"}
              classNames="flex justify-center items-center w-full h-10 mt-6 font-bold transition duration-300 bg-green-600 text-white rounded hover:bg-green-500"
            />
          </section>

          <section className="my-5 text-gray-100">
            <hr />
            <div className="text-2xl mb-3 mt-5">Rules:</div>
            <Notice notice={setting.notice} />
          </section>
        </div>
      </form>
    </UserPageWrapper>
  );

  return {
    OptionGame,
    selected: state.selected_option,
    amount: state.amount,
  };
};

export default useOptoinGame;

export const OptionGameStyles = [
  "bg-purple-500 text-white border-gray-900",
  "bg-red-500 text-white border-gray-900",
  "bg-green-500 text-white border-gray-900",
  "bg-yellow-500 text-gray-800 border-gray-900",
  "bg-blue-500 text-white border-gray-900",
  "bg-lime-500 text-gray-800 border-gray-900",
  "bg-amber-500 text-black border-gray-900",
];
