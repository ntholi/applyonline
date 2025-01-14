'use client';

import { Button, Group, NumberInput, TextInput } from '@mantine/core';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IconTrash } from '@tabler/icons-react';
import { Qualification } from '../types';

export default function GradesForm() {
  const form = useFormContext<Qualification>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'grades',
  });

  return (
    <div className='space-y-4'>
      {fields.map((field, index) => (
        <Group key={field.id}>
          <NumberInput
            label='Index'
            {...form.register(`grades.${index}.index`, { valueAsNumber: true })}
            className='w-24'
          />
          <TextInput
            label='Name'
            {...form.register(`grades.${index}.name`)}
            className='flex-1'
          />
          <Button
            color='red'
            variant='subtle'
            onClick={() => remove(index)}
            className='self-end'
          >
            <IconTrash size='1rem' />
          </Button>
        </Group>
      ))}
      <Button
        variant='light'
        onClick={() =>
          append({
            index: fields.length + 1,
            name: '',
            qualificationId: form.getValues('id'),
          })
        }
      >
        Add Grade
      </Button>
    </div>
  );
}
