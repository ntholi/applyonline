'use client';

import { findAllQualifications } from '@/server/qualifications/actions';
import { Select, SelectProps } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

type Props = Omit<SelectProps, 'data'>;

export default function QualificationSelect(props: Props) {
  const { data } = useQuery({
    queryKey: ['qualifications'],
    queryFn: async () => await findAllQualifications(),
    select: (data) =>
      data.items.map((q) => ({
        value: String(q.id),
        label: q.name,
      })),
  });

  return <Select {...props} data={data ?? []} />;
}
