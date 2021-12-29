import React, { ChangeEvent, useState, useContext } from "react";
import { SelectField } from "evergreen-ui";

import Table from "../../components/Table";
import Spinner from "../../components/Spinner";
import { CurrencyContext } from "../../App";
import { LatestFunction, ObjectNumber } from "../../types/api";

type Props = {
  getLatest: LatestFunction;
};

const ExchangeRate: React.FC<Props> = ({ getLatest }) => {
  const currency = useContext(CurrencyContext);
  const [baseValue, setBaseValue] = useState<string | undefined>(undefined);
  const [exchangeRate, setExchangeRate] = useState<ObjectNumber>({});
  const [isLoading, setIsLoading] = useState(false);

  const onSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
    setBaseValue(event.target.value);
    try {
      setIsLoading(true);
      const rates = await getLatest(event.target.value);
      Object.keys(rates).forEach((key) => {
        const oldValue = rates[key];
        const newValue = Math.round((1 / oldValue) * 100) / 100;
        rates[key] = newValue;
      });
      setExchangeRate(rates);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SelectField
        onChange={onSelect}
        label="Select base currency"
        value={baseValue}
        disabled={isLoading}
      >
        {!baseValue && <option value={undefined}>Not chosen</option>}
        {Object.entries(currency).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </SelectField>
      {isLoading && <Spinner />}
      {!isLoading && !!Object.keys(exchangeRate).length && baseValue && (
        <Table
          columnsNames={["Currency", "Value"]}
          tableValues={Object.entries(exchangeRate)}
          baseValue={baseValue}
        />
      )}
    </>
  );
};

export default ExchangeRate;
