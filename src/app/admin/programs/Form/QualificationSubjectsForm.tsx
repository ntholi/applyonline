'use client';

import { getQualificationGrades } from '@/server/qualifications/actions';
import {
  ActionIcon,
  Button,
  Checkbox,
  Modal,
  Select,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconTrashFilled } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Program } from '../types';
import SubjectSelect from './SubjectSelect';

type Props = {
  form: ReturnType<typeof useForm<Program>>;
  qualificationIndex: number;
};

export default function QualificationSubjectsForm({
  form,
  qualificationIndex,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [subjectId, setSubjectId] = useState<string>();
  const [gradeId, setGradeId] = useState<string>();
  const [required, setRequired] = useState(false);
  const [recommended, setRecommended] = useState(false);

  const qualificationId =
    form.values.programQualifications[qualificationIndex].qualificationId;

  const { data: grades } = useQuery({
    queryKey: ['qualification-grades', qualificationId],
    queryFn: () => getQualificationGrades(qualificationId),
    enabled: Boolean(qualificationId),
  });

  function handleAdd() {
    if (!subjectId || !gradeId) return;
    form.insertListItem(
      `programQualifications.${qualificationIndex}.subjects`,
      {
        subjectId: Number(subjectId),
        gradeId: Number(gradeId),
        required,
        recommended,
      }
    );
    setSubjectId(undefined);
    setGradeId(undefined);
    setRequired(false);
    setRecommended(false);
    close();
  }

  function handleRemove(index: number) {
    form.removeListItem(
      `programQualifications.${qualificationIndex}.subjects`,
      index
    );
  }

  return (
    <>
      <Button onClick={open}>Add Subject</Button>
      <Modal opened={opened} onClose={close} title='Add Subject'>
        <Stack>
          <SubjectSelect
            label='Subject'
            value={subjectId}
            onChange={(value) => setSubjectId(value ?? undefined)}
            qualificationId={qualificationId}
          />
          <Select
            label='Grade'
            value={gradeId}
            onChange={(value) => setGradeId(value ?? undefined)}
            data={
              grades?.map((g) => ({
                value: String(g.id),
                label: g.name,
              })) ?? []
            }
          />
          <Checkbox
            label='Required'
            checked={required}
            onChange={(e) => setRequired(e.currentTarget.checked)}
          />
          <Checkbox
            label='Recommended'
            checked={recommended}
            onChange={(e) => setRecommended(e.currentTarget.checked)}
          />
          <Button onClick={handleAdd}>Add</Button>
        </Stack>
      </Modal>

      <Table>
        <TableThead>
          <TableTr>
            <TableTh>Subject</TableTh>
            <TableTh>Grade</TableTh>
            <TableTh>Required</TableTh>
            <TableTh>Recommended</TableTh>
            <TableTh />
          </TableTr>
        </TableThead>
        <TableTbody>
          {form.values.programQualifications[qualificationIndex].subjects.map(
            (subject, index) => (
              <TableTr key={index}>
                <TableTd>{subject.subjectId}</TableTd>
                <TableTd>{subject.gradeId}</TableTd>
                <TableTd>{subject.required ? 'Yes' : 'No'}</TableTd>
                <TableTd>{subject.recommended ? 'Yes' : 'No'}</TableTd>
                <TableTd>
                  <ActionIcon
                    variant='subtle'
                    color='red'
                    onClick={() => handleRemove(index)}
                  >
                    <IconTrashFilled size={16} />
                  </ActionIcon>
                </TableTd>
              </TableTr>
            )
          )}
        </TableTbody>
      </Table>
    </>
  );
}
