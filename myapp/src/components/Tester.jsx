import React from "react";

const Tester = () => {
  const electron = window.electron;
  return (
    <div>
      tester is here
      <p> {electron.homeDir()}</p>
    </div>
  );
};

export default Tester;
