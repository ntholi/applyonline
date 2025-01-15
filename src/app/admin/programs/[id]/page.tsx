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
  List,
  ListItem,
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
  const program = await getProgram(id);

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
          await deleteProgram(id);
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
            <FieldView label='Name'>{program.name}</FieldView>
            <FieldView label='Faculty'>
              {program.faculty?.toUpperCase()}
            </FieldView>
            <FieldView label='Description'>{program.description}</FieldView>
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
                      <Badge
                        variant='light'
                        color='blue'
                        leftSection={<IconCertificate size='0.9rem' />}
                      >
                        Qualification
                      </Badge>
                    </Group>
                    {qual.subjects && qual.subjects.length > 0 && (
                      <Box mt='sm'>
                        <Text size='sm' fw={500} c='dimmed' mb='xs'>
                          Required Subjects
                        </Text>
                        <List
                          spacing='xs'
                          size='sm'
                          center
                          icon={
                            <IconCircleCheck
                              style={{
                                color: 'var(--mantine-color-blue-filled)',
                              }}
                              size='1rem'
                            />
                          }
                        >
                          {qual.subjects.map((subject) => (
                            <ListItem key={subject.subjectId}>
                              {subject.subject?.name}
                            </ListItem>
                          ))}
                        </List>
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
