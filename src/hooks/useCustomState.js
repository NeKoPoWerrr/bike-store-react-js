import { useState } from "react";

const useCustomState = (initState) => {
  const [state, setState] = useState(initState);

  const setStateWrapper = (diffState) => {
    setState((prevState) => ({
      ...prevState, ...diffState
    }));
  }

  return [state, setStateWrapper]
}

export default useCustomState;