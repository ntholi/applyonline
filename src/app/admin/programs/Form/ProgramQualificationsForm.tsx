'use client';

import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Grid,
  Group,
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
import QualificationSubjectsForm from './QualificationSubjectsForm';

interface Props {
  form: ReturnType<typeof useForm<Program>>;
}

export default function ProgramQualificationsForm({ form }: Props) {
  const [qualificationId, setQualificationId] = useState<string>();
  const theme = useMantineTheme();

  function handleAdd() {
    if (!qualificationId) return;

    form.insertListItem('programQualifications', {
      qualificationId: parseInt(qualificationId),
      subjects: [],
    });
    setQualificationId(undefined);
  }

  function handleRemove(index: number) {
    form.removeListItem('programQualifications', index);
  }

  return (
    <Stack gap='lg'>
      <Grid align='flex-end'>
        <Grid.Col span={{ base: 12, md: 9 }}>
          <QualificationSelect
            label='Add Qualification'
            value={qualificationId}
            onChange={(value) => setQualificationId(value ?? undefined)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
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
                      <QualificationSubjectsForm
                        form={form}
                        qualificationIndex={index}
                      />
                    </Stack>
                  </Group>
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
