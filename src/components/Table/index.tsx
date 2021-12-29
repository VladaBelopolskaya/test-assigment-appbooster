import React from "react";
import { Table } from "evergreen-ui";

// TODO: Сейчас проще передавать в tableValues значения из Object.entries, поэтому тип такой.
// Если таблица будет переиспольховаться - тип надо обощить
type Props = {
  columnsNames: string[];
  tableValues: [string, string][];
};

const CustomTable: React.FC<Props> = ({ columnsNames, tableValues }) => {
  return (
    <Table>
      <Table.Head>
        {columnsNames.map((name) => (
          <Table.TextHeaderCell key={name}>{name}</Table.TextHeaderCell>
        ))}
      </Table.Head>
      {/* TODO: В Evergreen нет таблицы с пагинацией, height работает только с фикс значением */}
      <Table.VirtualBody height={240}>
        {tableValues.map(([key, value]) => (
          <Table.Row key={key}>
            <Table.TextCell>{key}</Table.TextCell>
            <Table.TextCell>{value}</Table.TextCell>
          </Table.Row>
        ))}
      </Table.VirtualBody>
    </Table>
  );
};

export default CustomTable;
