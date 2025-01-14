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
import { Qualification } from '../types';

type Props = {
  form: ReturnType<typeof useForm<Qualification>>;
};

export default function SubjectsForm({ form }: Props) {
  const [name, setName] = useState<string>();
  const [code, setCode] = useState<string>();

  function handleAdd() {
    if (!name || !code) return;
    form.insertListItem('subjects', { name, code });
    setName('');
    setCode('');
  }

  function handleRemove(index: number) {
    form.removeListItem('subjects', index);
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
          <TextInput
            label='Code'
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 2 }}>
          <Button onClick={handleAdd} fullWidth>
            Add
          </Button>
        </Grid.Col>
      </Grid>
      <Title order={4} fw={100} mt={'md'}>
        Subjects
      </Title>
      <Divider />
      <Table withTableBorder>
        <TableThead>
          <TableTr>
            <TableTh>Name</TableTh>
            <TableTh>Code</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {form.values.subjects.map((subject, index) => (
            <TableTr key={index}>
              <TableTd>{subject.name}</TableTd>
              <TableTd>{subject.code}</TableTd>
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
