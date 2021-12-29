export type ObjectString = { [key: string]: string };
export type ObjectNumber = { [key: string]: number };

export type ConvertProps = {
  from: string;
  to: string;
  amount: string;
};

export type ConvertFunction = (props: ConvertProps) => Promise<ObjectNumber>;

export type LatestFunction = (base: string) => Promise<ObjectNumber>;

export type FetchSymbolsFunction = () => Promise<ObjectString>;
