import { QualificationGrade } from '@/app/admin/qualifications/types';
import React from 'react';
import {
  Table,
  TableTr,
  TableTd,
  TableTh,
  TableThead,
  TableTbody,
} from '@mantine/core';

type Props = {
  grades: QualificationGrade[];
};
export default function GradesTable({ grades }: Props) {
  return (
    <Table striped withTableBorder>
      <TableThead>
        <TableTr>
          <TableTh>Index</TableTh>
          <TableTh>Grade</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {grades.map((grade) => (
          <TableTr key={grade.id}>
            <TableTd>{grade.index}</TableTd>
            <TableTd>{grade.name}</TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
}
