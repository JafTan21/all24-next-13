import React from "react";

export default function HomeLoading() {
  return (
    <div
      className="animate-pulse flex  flex-wrap justify-center items-center"
      style={{ width: "90%" }}
    >
      <>
        {Array(10)
          .fill(null)
          .map((value, index) => {
            return (
              <div
                style={{ width: "300px" }}
                className="m-1"
                key={Math.random()}
              >
                <div
                  className="bg-gray-300 rounded-lg"
                  style={{
                    height: "50px",
                  }}
                ></div>
                <div
                  className="bg-gray-300 rounded-lg mt-2"
                  style={{
                    height: "20px",
                    width: "90%",
                  }}
                ></div>
                <div className="flex mt-1 space-x-1">
                  <div
                    className="bg-gray-300 rounded-lg"
                    style={{
                      height: "30px",
                      width: "40px",
                    }}
                  ></div>
                  <div
                    className="bg-gray-300 rounded-lg "
                    style={{
                      height: "30px",
                      width: "40px",
                    }}
                  ></div>
                  <div
                    className="bg-gray-300 rounded-lg "
                    style={{
                      height: "30px",
                      width: "40px",
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
      </>
    </div>
  );
}
