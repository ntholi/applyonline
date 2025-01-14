import { subjects } from '@/db/schema';
import {
  Table,
  TableTr,
  TableTd,
  TableTh,
  TableThead,
  TableTbody,
} from '@mantine/core';
import React from 'react';

type Subject = typeof subjects.$inferSelect;

type Props = {
  subjects: Subject[];
};

export default function SubjectsTable({ subjects }: Props) {
  const rows = subjects.map((subject) => {
    return (
      <TableTr key={subject.id}>
        <TableTd>{subject.name}</TableTd>
        <TableTd>{subject.code}</TableTd>
      </TableTr>
    );
  });

  return (
    <Table striped withTableBorder>
      <TableThead>
        <TableTr>
          <TableTh>Name</TableTh>
          <TableTh>Code</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>{rows}</TableTbody>
    </Table>
  );
}
