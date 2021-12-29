import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Pane, Tab, Tablist } from "evergreen-ui";

import LINKS from "../../utils/links";

type Props = {
  children: React.ReactNode;
};

const Sidebar: React.FC<Props> = ({ children }) => {
  let history = useHistory();
  let location = useLocation();

  const goToConverter = () => {
    history.push(LINKS.CONVERTER);
  };

  const goToExchange = () => {
    history.push(LINKS.EXCHANGE_RATE);
  };

  return (
    <Pane display="flex">
      <Tablist padding="20px" display="flex" flexDirection="column">
        <Tab
          justifyContent="flex-start"
          marginBottom={8}
          onSelect={goToConverter}
          isSelected={location.pathname === LINKS.CONVERTER}
        >
          Converter
        </Tab>
        <Tab
          justifyContent="flex-start"
          marginBottom={8}
          onSelect={goToExchange}
          isSelected={location.pathname === LINKS.EXCHANGE_RATE}
        >
          Current exchange rate
        </Tab>
      </Tablist>
      <Pane padding="20px" flex="1">
        {children}
      </Pane>
    </Pane>
  );
};

export default Sidebar;
