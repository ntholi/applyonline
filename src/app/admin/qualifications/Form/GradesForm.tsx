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
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconTrashFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { Qualification } from '../types';

type Props = {
  form: ReturnType<typeof useForm<Qualification>>;
};

export default function GradesForm({ form }: Props) {
  const [index, setIndex] = useState<number>();
  const [name, setName] = useState<string>();

  function handleAdd() {
    if (!name || !index) return;
    form.insertListItem('grades', {
      index,
      name,
      qualificationId: form.values.id,
    });
    setName('');
    setIndex(undefined);
  }

  function handleRemove(index: number) {
    form.removeListItem('grades', index);
  }

  return (
    <Stack>
      <Grid align='flex-end'>
        <Grid.Col span={{ base: 6, md: 5 }}>
          <NumberInput
            label='Index'
            value={index}
            onChange={(value) => setIndex(Number(value))}
            className='w-24'
          />
        </Grid.Col>
        <Grid.Col span={{ base: 6, md: 5 }}>
          <TextInput
            label='Name'
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            className='flex-1'
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 2 }}>
          <Button onClick={handleAdd} fullWidth>
            Add
          </Button>
        </Grid.Col>
      </Grid>
      <Title order={4} fw={100} mt={'md'}>
        Grades
      </Title>
      <Divider />
      <Table withTableBorder>
        <TableThead>
          <TableTr>
            <TableTh>Index</TableTh>
            <TableTh>Name</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {form.values.grades.map((grade, index) => (
            <TableTr key={index}>
              <TableTd>{grade.index}</TableTd>
              <TableTd>{grade.name}</TableTd>
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
