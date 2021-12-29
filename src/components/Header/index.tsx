import React from "react";
import { Heading, Pane } from "evergreen-ui";

const Header: React.FC = () => {
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="20px"
      border="default"
    >
      <Heading is="h1">Currency conversion</Heading>
    </Pane>
  );
};

export default Header;
