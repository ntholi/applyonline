'use client';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  ActionIcon,
  Button,
  Divider,
  Grid,
  GridCol,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconGripVertical, IconTrashFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { Qualification } from '../types';

type Props = {
  form: ReturnType<typeof useForm<Qualification>>;
};

type GradeItemProps = {
  id: string;
  name: string;
  onRemove: () => void;
};

export default function GradesForm({ form }: Props) {
  const [name, setName] = useState<string>('');
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleAdd() {
    if (!name.trim()) return;

    const maxIndex = form.values.grades.reduce(
      (max, grade) => Math.max(max, grade.index),
      -1
    );

    form.insertListItem('grades', {
      index: maxIndex + 1,
      name: name.trim(),
      qualificationId: form.values.id,
    });
    setName('');
  }

  function handleRemove(index: number) {
    form.removeListItem('grades', index);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = form.values.grades.findIndex(
      (grade) => `grade-${grade.index}` === active.id
    );
    const newIndex = form.values.grades.findIndex(
      (grade) => `grade-${grade.index}` === over.id
    );

    const newGrades = arrayMove(form.values.grades, oldIndex, newIndex).map(
      (grade, idx) => ({
        ...grade,
        index: idx,
      })
    );

    form.setFieldValue('grades', newGrades);
  }

  return (
    <Stack>
      <Stack gap='xs'>
        <Grid align='flex-end'>
          <GridCol span={10}>
            <TextInput
              label='Grade Name'
              placeholder='Enter grade name'
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </GridCol>
          <GridCol span={2}>
            <Button
              w={'100%'}
              onClick={handleAdd}
              disabled={!name.trim()}
              variant='outline'
            >
              Add
            </Button>
          </GridCol>
        </Grid>
      </Stack>

      <Title order={4} fw={100} mt='md'>
        Grades
      </Title>
      <Divider />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={form.values.grades.map((g) => `grade-${g.index}`)}
          strategy={verticalListSortingStrategy}
        >
          <Stack gap='xs'>
            {form.values.grades.map((grade, idx) => (
              <SortableGradeItem
                key={`grade-${grade.index}`}
                id={`grade-${grade.index}`}
                name={grade.name}
                onRemove={() => handleRemove(idx)}
              />
            ))}
          </Stack>
        </SortableContext>
      </DndContext>
    </Stack>
  );
}

function SortableGradeItem({ id, name, onRemove }: GradeItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      p='md'
      withBorder
      className='flex items-center gap-4 bg-white'
    >
      <ActionIcon
        {...attributes}
        {...listeners}
        variant='subtle'
        aria-label='Drag handle'
      >
        <IconGripVertical
          style={{ width: '70%', height: '70%' }}
          stroke={1.5}
        />
      </ActionIcon>
      <Text size='sm' className='flex-1'>
        {name}
      </Text>
      <ActionIcon
        variant='light'
        color='red'
        aria-label='Delete'
        onClick={onRemove}
      >
        <IconTrashFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </Paper>
  );
}
