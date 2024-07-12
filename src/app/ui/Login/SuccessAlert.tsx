import React from "react";

const SuccessAlert = () => {
  return (
    <>
      <div
        className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md my-4"
        role="alert"
      >
        <div className="text-center">
          <div>
            <p className="font-bold">Succesfully Sign up</p>
            <p className="text-sm">Please login</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessAlert;
