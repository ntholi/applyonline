import {
  ActionIcon,
  Button,
  Divider,
  Grid,
  Stack,
  Switch,
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
import { notifications } from '@mantine/notifications';

type Props = {
  form: ReturnType<typeof useForm<Qualification>>;
};

export default function SubjectsForm({ form }: Props) {
  const [name, setName] = useState<string>();
  const [code, setCode] = useState<string>();
  const [isCommercial, setIsCommercial] = useState(false);

  function handleAdd() {
    if (!name || !code) return;
    const isDuplicateName = form.values.subjects.some(
      (subject) => subject.name.toLowerCase() === name.toLowerCase(),
    );
    const isDuplicateCode = form.values.subjects.some(
      (subject) => subject.code.toLowerCase() === code.toLowerCase(),
    );

    if (isDuplicateName) {
      notifications.show({
        color: 'red',
        title: 'Duplicate Subject',
        message: `A subject with name "${name}" already exists`,
      });
      return;
    }

    if (isDuplicateCode) {
      notifications.show({
        color: 'red',
        title: 'Duplicate Subject',
        message: `A subject with code "${code}" already exists`,
      });
      return;
    }

    form.insertListItem('subjects', { name, code, isCommercial });
    setName('');
    setCode('');
    setIsCommercial(false);
  }

  function handleRemove(index: number) {
    form.removeListItem('subjects', index);
  }

  return (
    <Stack>
      <Grid align='flex-end' gutter='lg'>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label='Name'
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <TextInput
            label='Code'
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }} pt={23}>
          <Switch
            label='Commercial'
            checked={isCommercial}
            onChange={(e) => setIsCommercial(e.currentTarget.checked)}
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
            <TableTh>Commercial</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {form.values.subjects.map((subject, index) => (
            <TableTr key={index}>
              <TableTd>{subject.name}</TableTd>
              <TableTd>{subject.code}</TableTd>
              <TableTd>{subject.isCommercial ? 'Yes' : 'No'}</TableTd>
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
