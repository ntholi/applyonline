import { DetailsView, DetailsViewHeader, FieldView } from '@/components/adease';
import { notFound } from 'next/navigation';
import { getProgram, deleteProgram } from '@/server/programs/actions';
import {
  Box,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Card,
  Text,
  Stack,
  Badge,
  Group,
} from '@mantine/core';
import {
  IconInfoSquare,
  IconCertificate,
  IconCircleCheck,
} from '@tabler/icons-react';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProgramDetails({ params }: Props) {
  const { id } = await params;
  const program = await getProgram(Number(id));

  if (!program) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader
        title={'Program'}
        queryKey={['programs']}
        handleDelete={async () => {
          'use server';
          await deleteProgram(Number(id));
        }}
      />
      <Box p='sm'>
        <Tabs defaultValue='basic'>
          <TabsList>
            <TabsTab value='basic' leftSection={<IconInfoSquare size='1rem' />}>
              Basic Info
            </TabsTab>
            <TabsTab
              value='qualifications'
              leftSection={<IconCertificate size='1rem' />}
            >
              Qualifications
            </TabsTab>
          </TabsList>
          <TabsPanel value='basic' p='lg' pt={'xl'}>
            <Stack gap='md'>
              <FieldView label='Name'>{program.name}</FieldView>
              <FieldView label='Faculty'>
                {program.faculty?.toUpperCase()}
              </FieldView>
              <FieldView label='Description'>{program.description}</FieldView>
            </Stack>
          </TabsPanel>
          <TabsPanel value='qualifications' p='lg' pt={'xl'}>
            {program.qualifications && program.qualifications.length > 0 ? (
              <Stack gap='md'>
                {program.qualifications.map((qual) => (
                  <Card
                    key={qual.qualificationId}
                    withBorder
                    shadow='sm'
                    radius='md'
                    p='md'
                  >
                    <Group justify='space-between' mb='xs'>
                      <Text fw={600} size='lg'>
                        {qual.qualification.name}
                      </Text>
                    </Group>
                    <Group>
                      <Badge variant='default'>
                        Min Credits: {qual.minCredits}
                      </Badge>
                      <Badge variant='default'>
                        Min Passes: {qual.minPasses}
                      </Badge>
                    </Group>
                    {qual.subjects && qual.subjects.length > 0 && (
                      <Box mt='md'>
                        <Text
                          size='sm'
                          fw={600}
                          c='dimmed'
                          mb='md'
                          tt='uppercase'
                        >
                          Entry Requirements
                        </Text>
                        <Stack gap='xs'>
                          {qual.subjects.map((subject) => (
                            <Card
                              key={subject.subjectId}
                              withBorder
                              radius='md'
                              p='xs'
                            >
                              <Group justify='space-between' wrap='nowrap'>
                                <Group gap='sm' wrap='nowrap'>
                                  <IconCircleCheck
                                    style={{
                                      color: subject.mandatory
                                        ? 'var(--mantine-color-blue-filled)'
                                        : 'var(--mantine-color-gray-filled)',
                                    }}
                                    size='1.2rem'
                                  />
                                  <div>
                                    <Text size='sm' fw={500}>
                                      {subject.subjectId} {` (subjectId)`}
                                    </Text>
                                    <Text size='xs' c='dimmed'>
                                      Minimum Grade {subject.gradeId}{' '}
                                      {` (gradeId)`}
                                    </Text>
                                  </div>
                                </Group>
                                <Badge
                                  variant={
                                    subject.mandatory ? 'filled' : 'light'
                                  }
                                  color={subject.mandatory ? 'blue' : 'gray'}
                                  size='sm'
                                >
                                  {subject.mandatory ? 'Required' : 'Optional'}
                                </Badge>
                              </Group>
                            </Card>
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Card>
                ))}
              </Stack>
            ) : (
              <Card withBorder p='xl' ta='center'>
                <Text size='sm' c='dimmed'>
                  No qualifications added yet.
                </Text>
              </Card>
            )}
          </TabsPanel>
        </Tabs>
      </Box>
    </DetailsView>
  );
}
