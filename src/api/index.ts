import {
  ConvertFunction,
  LatestFunction,
  FetchSymbolsFunction,
} from "../types/api";

const API_KEY = "f2f2568dee-c8d71c97f8-r4ud18";

export const fetchSymbols: FetchSymbolsFunction = async () => {
  let response = await fetch(
    `https://api.fastforex.io/currencies?api_key=${API_KEY}`
  );
  let jsonResponse = await response.json();

  if (response.ok) {
    return jsonResponse.currencies;
  } else {
    throw new Error(jsonResponse.error);
  }
};

export const fetchLatest: LatestFunction = async (base) => {
  let response = await fetch(
    `https://api.fastforex.io/fetch-all?from=${base}&api_key=${API_KEY}`
  );
  let jsonResponse = await response.json();
  if (response.ok) {
    return jsonResponse.results;
  } else {
    throw new Error(jsonResponse.error);
  }
};

export const convert: ConvertFunction = async ({ from, to, amount }) => {
  let response = await fetch(
    `https://api.fastforex.io/convert?from=${from}&to=${to}&amount=${amount}&api_key=${API_KEY}`
  );
  let jsonResponse = await response.json();

  if (response.ok) {
    return jsonResponse.result;
  } else {
    throw new Error(jsonResponse.error);
  }
};
