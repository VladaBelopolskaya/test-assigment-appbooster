import React, { ChangeEvent, useState, useContext } from "react";
import { Button, Pane, TextInputField, Text } from "evergreen-ui";
import { CurrencyContext } from "../../App";
import { ConvertFunction } from "../../types/api";
import Spinner from "../../components/Spinner";
import {
  getConverterValueError,
  getPartsOfConverterValue,
} from "../../utils/validate";

type Props = {
  getConvertAmount: ConvertFunction;
};

const Converter: React.FC<Props> = ({ getConvertAmount }) => {
  const currency = useContext(CurrencyContext);
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validMessage, setValidMessage] = useState<string | null>(null);
  const [convertResult, setConvertResult] =
    useState<{ [key: string]: string | number }>();
  const [partsOfValue, setPartsOfValue] = useState<{
    amount: string;
    fromCurrency: string;
    toCurrency: string;
  }>();

  const onChangenput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSubmit = async () => {
    const errorText = getConverterValueError(value, Object.keys(currency));
    const partsOfConverterValue = getPartsOfConverterValue(value);
    if (errorText) {
      setValidMessage(errorText);
    } else if (partsOfConverterValue) {
      setValidMessage(null);
      try {
        const { amount, fromCurrency, toCurrency } = partsOfConverterValue;
        setIsLoading(true);
        const result = await getConvertAmount({
          amount: amount,
          from: fromCurrency,
          to: toCurrency,
        });
        setConvertResult(result);
        setPartsOfValue({ amount, fromCurrency, toCurrency });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Pane display="flex" alignItems="end">
        <TextInputField
          flex="1"
          label="Write your request"
          value={value}
          onChange={onChangenput}
          description="Example: 15 usd in rub"
          isInvalid={!!validMessage}
          validationMessage={validMessage}
          disabled={isLoading}
        />
        <Button
          appearance="primary"
          onClick={onSubmit}
          marginLeft={16}
          marginBottom={!validMessage ? 24 : 50}
          disabled={isLoading}
        >
          Submit
        </Button>
      </Pane>

      <Text>Available abbreviation: {Object.keys(currency).join(", ")}</Text>
      {isLoading && <Spinner />}
      {!isLoading && convertResult && partsOfValue && (
        <Pane border="default" marginTop={24} padding={10}>
          <Text>
            Result: {partsOfValue.amount} {partsOfValue.fromCurrency} is{" "}
            {convertResult![partsOfValue.toCurrency!.toUpperCase()]}{" "}
            {partsOfValue.toCurrency}
          </Text>
        </Pane>
      )}
    </>
  );
};

export default Converter;
