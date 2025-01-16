'use client';

import { getQualification } from '@/server/qualifications/actions';
import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  NumberInput,
  rgba,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCertificate, IconTrashFilled } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Program } from '../types';
import QualificationSelect from './QualificationSelect';
import SubjectsForm from './SubjectsForm';

interface Props {
  form: ReturnType<typeof useForm<Program>>;
}

export default function QualificationsForm({ form }: Props) {
  const [qualificationId, setQualificationId] = useState<string>();
  const [minCredits, setMinCredits] = useState<number>(0);
  const [minPasses, setMinPasses] = useState<number>(0);
  const theme = useMantineTheme();

  function handleAdd() {
    if (!qualificationId) return;

    form.insertListItem('programQualifications', {
      qualificationId: parseInt(qualificationId),
      subjects: [],
      minCredits,
      minPasses,
    });
    setQualificationId(undefined);
    setMinCredits(0);
    setMinPasses(0);
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
            value={minCredits}
            onChange={(value) => setMinCredits(Number(value))}
            min={0}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 2 }}>
          <NumberInput
            label='Min Passes'
            value={minPasses}
            onChange={(value) => setMinPasses(Number(value))}
            min={0}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 2 }}>
          <Button fullWidth onClick={handleAdd} disabled={!qualificationId}>
            Add
          </Button>
        </Grid.Col>
      </Grid>

      <Divider my='xs' />

      <ScrollArea.Autosize mah={600}>
        {form.values.programQualifications?.length > 0 ? (
          <Stack gap='md'>
            {form.values.programQualifications?.map((qualification, index) => (
              <QualificationCard
                key={index}
                qualification={qualification}
                index={index}
                onRemove={handleRemove}
                form={form}
              />
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

interface QualificationCardProps {
  qualification: Program['programQualifications'][number];
  index: number;
  onRemove: (index: number) => void;
  form: ReturnType<typeof useForm<Program>>;
}

function QualificationCard({
  qualification,
  index,
  onRemove,
  form,
}: QualificationCardProps) {
  const theme = useMantineTheme();
  const { data } = useQuery({
    queryKey: ['qualification', qualification.qualificationId],
    queryFn: () => getQualification(qualification.qualificationId),
    enabled: Boolean(qualification.qualificationId),
  });
  return (
    <Card key={index} withBorder radius='md' padding='lg'>
      <Card.Section withBorder inheritPadding py='xs'>
        <Group justify='space-between' align='center' wrap='nowrap'>
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
              <IconCertificate style={{ width: '60%', height: '60%' }} />
            </ThemeIcon>
            <div>
              <Text fw={600} size='lg'>
                {data?.name}
              </Text>
              <Text size='sm' c='dimmed'>
                Min Credits: {qualification.minCredits} | Min Passes:{' '}
                {qualification.minPasses}
              </Text>
            </div>
          </Group>
          <Tooltip label='Remove Qualification'>
            <ActionIcon
              variant='light'
              color='red'
              radius='md'
              onClick={() => onRemove(index)}
            >
              <IconTrashFilled size={'1rem'} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Card.Section>
      <Card.Section withBorder inheritPadding py='xs'>
        <SubjectsForm form={form} qualificationIndex={index} />
      </Card.Section>
    </Card>
  );
}
