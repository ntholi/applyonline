'use client';

import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  NumberInput,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
  rem,
  rgba,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconCertificate,
  IconPlus,
  IconTrashFilled,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Program } from '../types';
import QualificationSelect from './QualificationSelect';
import SubjectsForm from './SubjectsForm';

interface Props {
  form: ReturnType<typeof useForm<Program>>;
}

export default function QualificationsForm({ form }: Props) {
  const [qualificationId, setQualificationId] = useState<string>();
  const theme = useMantineTheme();

  function handleAdd() {
    if (!qualificationId) return;

    form.insertListItem('programQualifications', {
      qualificationId: parseInt(qualificationId),
      subjects: [],
      minCredits: 0,
      minPasses: 0,
    });
    setQualificationId(undefined);
  }

  function handleRemove(index: number) {
    form.removeListItem('programQualifications', index);
  }

  return (
    <Stack gap='lg'>
      <Grid align='flex-end'>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <QualificationSelect
            label='Add Qualification'
            value={qualificationId}
            onChange={(value) => setQualificationId(value ?? undefined)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 2 }}>
          <NumberInput
            label='Min Credits'
            value={
              form.values.programQualifications?.[
                form.values.programQualifications.length - 1
              ]?.minCredits ?? 0
            }
            onChange={(value) => {
              if (form.values.programQualifications?.length) {
                form.setFieldValue(
                  `programQualifications.${
                    form.values.programQualifications.length - 1
                  }.minCredits`,
                  value
                );
              }
            }}
            min={0}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 2 }}>
          <NumberInput
            label='Min Passes'
            value={
              form.values.programQualifications?.[
                form.values.programQualifications.length - 1
              ]?.minPasses ?? 0
            }
            onChange={(value) => {
              if (form.values.programQualifications?.length) {
                form.setFieldValue(
                  `programQualifications.${
                    form.values.programQualifications.length - 1
                  }.minPasses`,
                  value
                );
              }
            }}
            min={0}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 2 }}>
          <Button
            fullWidth
            onClick={handleAdd}
            disabled={!qualificationId}
            leftSection={
              <IconPlus style={{ width: rem(18), height: rem(18) }} />
            }
          >
            Add
          </Button>
        </Grid.Col>
      </Grid>

      <Divider my='xs' />

      <ScrollArea.Autosize mah={600}>
        {form.values.programQualifications?.length > 0 ? (
          <Stack gap='md'>
            {form.values.programQualifications?.map((qualification, index) => (
              <Card key={index} withBorder radius='md' padding='lg'>
                <Card.Section withBorder inheritPadding py='xs'>
                  <Group
                    justify='space-between'
                    align='flex-start'
                    wrap='nowrap'
                  >
                    <Group wrap='nowrap'>
                      <ThemeIcon
                        size={42}
                        radius='md'
                        variant='light'
                        color='blue'
                        style={{
                          backgroundColor: rgba(theme.colors.blue[6], 0.1),
                        }}
                      >
                        <IconCertificate
                          style={{ width: '60%', height: '60%' }}
                        />
                      </ThemeIcon>
                      <div>
                        <Text fw={600} size='lg'>
                          Qualification {qualification.qualificationId}
                        </Text>
                        <Text size='sm' c='dimmed'>
                          {qualification.subjects.length} Subject
                          {qualification.subjects.length !== 1 ? 's' : ''}
                        </Text>
                      </div>
                    </Group>
                    <Stack>
                      <Tooltip label='Remove Qualification'>
                        <ActionIcon
                          variant='light'
                          color='red'
                          size='lg'
                          radius='md'
                          onClick={() => handleRemove(index)}
                        >
                          <IconTrashFilled
                            style={{ width: '60%', height: '60%' }}
                          />
                        </ActionIcon>
                      </Tooltip>
                    </Stack>
                  </Group>
                </Card.Section>
                <Card.Section withBorder inheritPadding py='xs'>
                  <SubjectsForm form={form} qualificationIndex={index} />
                </Card.Section>
              </Card>
            ))}
          </Stack>
        ) : (
          <Card
            withBorder
            padding='xl'
            radius='lg'
            style={{
              backgroundColor: rgba(theme.colors.blue[6], 0.02),
            }}
          >
            <Stack align='center' gap='lg'>
              <ThemeIcon
                size={80}
                radius='md'
                variant='light'
                color='blue'
                style={{ backgroundColor: rgba(theme.colors.blue[6], 0.1) }}
              >
                <IconCertificate style={{ width: '60%', height: '60%' }} />
              </ThemeIcon>
              <Stack align='center' gap={4}>
                <Text size='xl' fw={600}>
                  No Qualifications Added
                </Text>
                <Text size='sm' c='dimmed' ta='center' maw={400}>
                  Start by adding a qualification above to configure program
                  requirements
                </Text>
              </Stack>
            </Stack>
          </Card>
        )}
      </ScrollArea.Autosize>
    </Stack>
  );
}
