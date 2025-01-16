'use client';

import {
  getQualificationGrades,
  getQualificationSubjects,
} from '@/server/qualifications/actions';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  Modal,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  rgba,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconTrashFilled } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Program } from '../types';
import SubjectSelect from './SubjectSelect';

type Props = {
  form: ReturnType<typeof useForm<Program>>;
  qualificationIndex: number;
};

export default function SubjectsForm({ form, qualificationIndex }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [subjectId, setSubjectId] = useState<string>();
  const [gradeId, setGradeId] = useState<string>();
  const [mandatory, setMandatory] = useState(false);
  const theme = useMantineTheme();

  const qualificationId =
    form.values.programQualifications[qualificationIndex].qualificationId;

  const { data: grades, isLoading } = useQuery({
    queryKey: ['qualification-grades', qualificationId],
    queryFn: () => getQualificationGrades(qualificationId),
    enabled: Boolean(qualificationId),
  });

  const { data: subjects } = useQuery({
    queryKey: ['qualification-subjects', qualificationId],
    queryFn: () => getQualificationSubjects(qualificationId),
    enabled: Boolean(qualificationId),
  });

  function handleAdd() {
    if (!subjectId || !gradeId) return;
    form.insertListItem(
      `programQualifications.${qualificationIndex}.subjects`,
      {
        subjectId: Number(subjectId),
        gradeId: Number(gradeId),
        mandatory,
      }
    );
    setSubjectId(undefined);
    setGradeId(undefined);
    setMandatory(false);
    close();
  }

  function handleRemove(index: number) {
    form.removeListItem(
      `programQualifications.${qualificationIndex}.subjects`,
      index
    );
  }

  const formSubjects =
    form.values.programQualifications[qualificationIndex].subjects;

  return (
    <Stack>
      <div>
        <Group justify='space-between'>
          <Stack gap={0}>
            <Text>Subjects</Text>
          </Stack>
          <ActionIcon variant='light' onClick={open}>
            <IconPlus size={'1rem'} />
          </ActionIcon>
        </Group>
        <Divider mt='xs' />
      </div>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md' verticalSpacing='md'>
        {formSubjects.map((subject, index) => {
          const color = subject.mandatory ? 'red' : 'gray';
          const subjectDetails = subjects?.find(
            (s) => s.id === subject.subjectId
          );

          return (
            <Card key={index} withBorder padding={0} radius='md'>
              <Card.Section p='sm' bg={rgba(theme.colors['gray'][6], 0.1)}>
                <Group justify='space-between'>
                  <Group>
                    <Text fw={500} size='lg'>
                      {subjectDetails?.name ?? subject.subjectId}
                    </Text>
                    <Badge size='xs' color={color} variant='outline'>
                      {subject.mandatory ? 'Required' : 'Optional'}
                    </Badge>
                  </Group>
                  <Tooltip label='Remove subject'>
                    <ActionIcon
                      variant='subtle'
                      color='red'
                      onClick={() => handleRemove(index)}
                    >
                      <IconTrashFilled
                        style={{ width: '70%', height: '70%' }}
                      />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Card.Section>

              <Card.Section p='md'>
                <Group justify='space-between' align='center'>
                  <Text size='sm' c='dimmed'>
                    Minimum Grade
                  </Text>
                  <Text fw={600} size='xl'>
                    {grades?.find((g) => g.id === subject.gradeId)?.name ??
                      subject.gradeId}
                  </Text>
                </Group>
              </Card.Section>
            </Card>
          );
        })}
      </SimpleGrid>
      <Modal
        opened={opened}
        onClose={close}
        title='Add Subject Requirement'
        size='lg'
      >
        <Stack gap='lg'>
          <SubjectSelect
            label='Subject'
            description='Select the required subject'
            placeholder='Choose a subject'
            value={subjectId}
            onChange={(value) => setSubjectId(value ?? undefined)}
            qualificationId={qualificationId}
          />

          <Select
            label='Minimum Grade'
            description='Select the minimum required grade'
            placeholder='Choose a grade'
            value={gradeId}
            onChange={(value) => setGradeId(value ?? undefined)}
            data={
              grades?.map((g) => ({
                value: String(g.id),
                label: g.name,
              })) ?? []
            }
            disabled={isLoading}
            nothingFoundMessage={
              isLoading ? 'Loading grades...' : 'No grades found'
            }
          />

          <Stack gap='xs'>
            <Checkbox
              label='Mandatory Subject'
              description='Student must have this subject'
              checked={mandatory}
              onChange={(e) => {
                setMandatory(e.currentTarget.checked);
              }}
            />
          </Stack>

          <Group justify='flex-end' mt='md'>
            <Button variant='subtle' onClick={close}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={!subjectId || !gradeId}>
              Add Subject
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
