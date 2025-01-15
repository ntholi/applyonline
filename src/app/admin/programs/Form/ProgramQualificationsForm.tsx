'use client';

import {
  ActionIcon,
  Button,
  Divider,
  Grid,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconTrashFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { Program } from '../types';
import QualificationSelect from './QualificationSelect';
import QualificationSubjectsForm from './QualificationSubjectsForm';

type Props = {
  form: ReturnType<typeof useForm<Program>>;
};

export function ProgramQualificationsForm({ form }: Props) {
  const [name, setName] = useState<string>();
  const [qualificationId, setQualificationId] = useState<string>();

  function handleAdd() {
    if (!name || !qualificationId) return;

    form.insertListItem('programQualifications', {
      name,
      qualificationId: Number(qualificationId),
      subjects: [],
    });

    setName(undefined);
    setQualificationId(undefined);
  }

  function handleRemove(index: number) {
    form.removeListItem('programQualifications', index);
  }

  return (
    <Stack>
      <Grid align='flex-end'>
        <Grid.Col span={{ base: 6, md: 5 }}>
          <TextInput
            label='Name'
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 6, md: 5 }}>
          <QualificationSelect
            label='Qualification'
            value={qualificationId}
            onChange={(value) => setQualificationId(value ?? undefined)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 2 }}>
          <Button onClick={handleAdd} fullWidth>
            Add
          </Button>
        </Grid.Col>
      </Grid>
      <Title order={4} fw={100} mt={'md'}>
        Program Qualifications
      </Title>
      <Divider />
      <Table withTableBorder>
        <TableThead>
          <TableTr>
            <TableTh>Name</TableTh>
            <TableTh>Qualification</TableTh>
            <TableTh>Subjects</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {form.values.programQualifications?.map((qualification, index) => (
            <TableTr key={index}>
              <TableTd>{qualification.name}</TableTd>
              <TableTd>{qualification.qualificationId}</TableTd>
              <TableTd>
                <QualificationSubjectsForm
                  form={form}
                  qualificationIndex={index}
                />
              </TableTd>
              <TableTd align='right'>
                <ActionIcon
                  variant='light'
                  color='red'
                  aria-label='Delete'
                  onClick={() => handleRemove(index)}
                >
                  <IconTrashFilled
                    style={{ width: '70%', height: '70%' }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </Stack>
  );
}
