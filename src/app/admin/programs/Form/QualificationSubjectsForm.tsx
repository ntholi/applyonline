'use client';

import {
  getQualification,
  getQualificationGrades,
  getQualificationSubjects,
} from '@/server/qualifications/actions';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Checkbox,
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

export default function QualificationSubjectsForm({
  form,
  qualificationIndex,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [subjectId, setSubjectId] = useState<string>();
  const [gradeId, setGradeId] = useState<string>();
  const [required, setRequired] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const theme = useMantineTheme();

  const qualificationId =
    form.values.programQualifications[qualificationIndex].qualificationId;

  const { data: qualification } = useQuery({
    queryKey: ['qualification', qualificationId],
    queryFn: () => getQualification(qualificationId),
    enabled: Boolean(qualificationId),
  });

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

  const formSubjects =
    form.values.programQualifications[qualificationIndex].subjects;

  return (
    <Stack gap='xl'>
      <Group justify='space-between'>
        <Stack gap={0}>
          <Text>Subjects</Text>
          {qualification && (
            <Text size="sm" c="dimmed">{qualification.name}</Text>
          )}
        </Stack>
        <ActionIcon variant='outline' onClick={open}>
          <IconPlus size={'1rem'} />
        </ActionIcon>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md' verticalSpacing='md'>
        {formSubjects.map((subject, index) => {
          const isRequired = subject.required;
          const isRecommended = subject.recommended;
          const color = isRequired ? 'red' : isRecommended ? 'blue' : 'gray';
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
                      {isRequired
                        ? 'Required'
                        : isRecommended
                        ? 'Recommended'
                        : 'Optional'}
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
              label='Required Subject'
              description='Student must have this subject'
              checked={required}
              onChange={(e) => {
                setRequired(e.currentTarget.checked);
                if (e.currentTarget.checked) {
                  setRecommended(false);
                }
              }}
            />
            <Checkbox
              label='Recommended Subject'
              description='Subject is recommended but not required'
              checked={recommended}
              onChange={(e) => {
                setRecommended(e.currentTarget.checked);
                if (e.currentTarget.checked) {
                  setRequired(false);
                }
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
