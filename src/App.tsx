import { Dialog, Text } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Spinner from "./components/Spinner";
import Converter from "./pages/Converter";
import ExchangeRate from "./pages/ExchangeRate";
import { convert, fetchLatest, fetchSymbols } from "./api";
import { ConvertFunction, LatestFunction, ObjectString } from "./types/api";
import LINKS from "./utils/links";

export const CurrencyContext = React.createContext<ObjectString>({});

function App() {
  const [symbols, setSymbols] = useState<ObjectString>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  const getSymbols = async () => {
    try {
      setIsLoading(true);
      const symbols = await fetchSymbols();
      setSymbols(symbols);
    } catch (e: any) {
      setApiError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getLatest: LatestFunction = async (base) => {
    try {
      return await fetchLatest(base);
    } catch (e: any) {
      setApiError(e.message);
      throw new Error();
    }
  };

  const getConvertAmount: ConvertFunction = async ({ from, to, amount }) => {
    try {
      return await convert({ from, to, amount });
    } catch (e: any) {
      setApiError(e.message);
      throw new Error();
    }
  };

  useEffect(() => {
    getSymbols();
  }, []);

  const onCloseDialog = () => {
    setApiError("");
  };

  return (
    <>
      <Header />
      <Router>
        <Sidebar>
          {isLoading ? (
            <Spinner />
          ) : (
            <CurrencyContext.Provider value={symbols}>
              <Switch>
                <Route exact path={LINKS.EXCHANGE_RATE}>
                  <ExchangeRate getLatest={getLatest} />
                </Route>
                <Route exact path={LINKS.CONVERTER}>
                  <Converter getConvertAmount={getConvertAmount} />
                </Route>
                <Redirect to={LINKS.CONVERTER} />
              </Switch>
            </CurrencyContext.Provider>
          )}
        </Sidebar>
      </Router>
      <Dialog
        isShown={!!apiError}
        title="Error"
        onCloseComplete={onCloseDialog}
        hasFooter={false}
      >
        <Text>{apiError}</Text>
      </Dialog>
    </>
  );
}

export default App;
