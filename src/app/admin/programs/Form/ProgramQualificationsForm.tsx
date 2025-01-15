'use client';

import {
  ActionIcon,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Paper,
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
  IconSettings,
  IconCheck,
  IconAlertCircle,
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
    <Container size='xl' px={0}>
      <Paper shadow='sm' radius='lg' p='lg' withBorder>
        <Stack gap='lg'>
          <Grid align='flex-end'>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <QualificationSelect
                label='Add Qualification'
                description='Select a qualification to add to the program requirements'
                placeholder='Search and select a qualification...'
                value={qualificationId}
                onChange={(value) => setQualificationId(value ?? undefined)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Button
                fullWidth
                size='md'
                onClick={handleAdd}
                disabled={!qualificationId}
                leftSection={
                  <IconPlus style={{ width: rem(18), height: rem(18) }} />
                }
              >
                Add Qualification
              </Button>
            </Grid.Col>
          </Grid>

          <Divider my='xs' />

          <ScrollArea.Autosize mah={600}>
            {form.values.programQualifications?.length > 0 ? (
              <Stack gap='md'>
                {form.values.programQualifications?.map(
                  (qualification, index) => (
                    <Card key={index} withBorder radius='md' padding='lg'>
                      <Card.Section withBorder inheritPadding py='xs'>
                        <Group justify='space-between' wrap='nowrap'>
                          <Group wrap='nowrap'>
                            <ThemeIcon
                              size={42}
                              radius='md'
                              variant='light'
                              color='blue'
                              style={{
                                backgroundColor: rgba(
                                  theme.colors.blue[6],
                                  0.1
                                ),
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
                              <Group gap={8}>
                                <Text size='sm' c='dimmed'>
                                  {qualification.subjects.length} Subject
                                  {qualification.subjects.length !== 1
                                    ? 's'
                                    : ''}
                                </Text>
                                {qualification.subjects.length > 0 ? (
                                  <Tooltip label='All subjects configured'>
                                    <ThemeIcon
                                      size='sm'
                                      radius='xl'
                                      color='green'
                                      variant='light'
                                    >
                                      <IconCheck size={12} />
                                    </ThemeIcon>
                                  </Tooltip>
                                ) : (
                                  <Tooltip label='Subjects need configuration'>
                                    <ThemeIcon
                                      size='sm'
                                      radius='xl'
                                      color='yellow'
                                      variant='light'
                                    >
                                      <IconAlertCircle size={12} />
                                    </ThemeIcon>
                                  </Tooltip>
                                )}
                              </Group>
                            </div>
                          </Group>
                          <Group gap='xs'>
                            <Tooltip label='Configure Subjects'>
                              <ActionIcon
                                variant='light'
                                color='blue'
                                size='lg'
                                radius='md'
                                onClick={() => {}}
                              >
                                <IconSettings
                                  style={{ width: '60%', height: '60%' }}
                                />
                              </ActionIcon>
                            </Tooltip>
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
                          </Group>
                        </Group>
                      </Card.Section>
                      <Box pt='md'>
                        <QualificationSubjectsForm
                          form={form}
                          qualificationIndex={index}
                        />
                      </Box>
                    </Card>
                  )
                )}
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
      </Paper>
    </Container>
  );
}
