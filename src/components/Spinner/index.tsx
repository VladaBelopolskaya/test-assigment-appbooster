import React from "react";
import { Pane, Spinner } from "evergreen-ui";

const CustomSpinner: React.FC = () => {
  return (
    <Pane display="flex" justifyContent="center" alignItems="center">
      <Spinner />
    </Pane>
  );
};

export default CustomSpinner;
