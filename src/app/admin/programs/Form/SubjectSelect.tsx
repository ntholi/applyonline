'use client';

import { getQualificationSubjects } from '@/server/qualifications/actions';
import { Select, SelectProps } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

type Props = Omit<SelectProps, 'data'> & {
  qualificationId: number;
};

export default function SubjectSelect({ qualificationId, ...props }: Props) {
  const { data: subjects } = useQuery({
    queryKey: ['qualification-subjects', qualificationId],
    queryFn: () => getQualificationSubjects(qualificationId),
    enabled: Boolean(qualificationId),
  });

  return (
    <Select
      {...props}
      data={
        subjects?.map((s) => ({
          value: String(s.id),
          label: s.name,
        })) ?? []
      }
    />
  );
}
