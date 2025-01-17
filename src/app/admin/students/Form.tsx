'use client';

import { students } from '@/db/schema';
import { Form } from '@/components/adease';
import { TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';

type Student = typeof students.$inferInsert;

type Props = {
  onSubmit: (values: Student) => Promise<Student>;
  defaultValues?: Student;
  onSuccess?: (value: Student) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>
  ) => void;
  title?: string;
};

export default function StudentForm({ onSubmit, defaultValues, title }: Props) {
  const router = useRouter();

  return (
    <Form
      title={title}
      action={onSubmit}
      queryKey={['students']}
      schema={createInsertSchema(students)}
      defaultValues={defaultValues}
      onSuccess={({ id }) => {
        router.push(`/admin/students/${id}`);
      }}
    >
      {(form) => (
        <>
          <TextInput
            label='National Id'
            {...form.getInputProps('nationalId')}
          />
          <TextInput label='Name' {...form.getInputProps('name')} />
          <TextInput label='Email' {...form.getInputProps('email')} />
          <TextInput label='Phone1' {...form.getInputProps('phone1')} />
          <TextInput label='Phone2' {...form.getInputProps('phone2')} />
          <TextInput label='Religion' {...form.getInputProps('religion')} />
          <DateInput
            label='Date Of Birth'
            {...form.getInputProps('dateOfBirth')}
          />
          <TextInput label='Gender' {...form.getInputProps('gender')} />
          <TextInput
            label='Marital Status'
            {...form.getInputProps('maritalStatus')}
          />
          <TextInput
            label='Birth Place'
            {...form.getInputProps('birthPlace')}
          />
          <TextInput label='Home Town' {...form.getInputProps('homeTown')} />
          <TextInput
            label='High School'
            {...form.getInputProps('highSchool')}
          />
          <TextInput
            label='Next Of Kin Names'
            {...form.getInputProps('nextOfKinNames')}
          />
          <TextInput
            label='Next Of Kin Phone'
            {...form.getInputProps('nextOfKinPhone')}
          />
          <TextInput
            label='Next Of Kin Relationship'
            {...form.getInputProps('nextOfKinRelationship')}
          />
        </>
      )}
    </Form>
  );
}
