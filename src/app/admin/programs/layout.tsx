'use client';

import { PropsWithChildren } from 'react';
import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { findAllPrograms } from '@/server/programs/actions';
import { Text } from '@mantine/core';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      path={'/admin/programs'}
      queryKey={['programs']}
      getItems={findAllPrograms}
      actionIcons={[<NewLink key={'new-link'} href='/admin/programs/new' />]}
      renderItem={(it) => (
        <ListItem
          id={it.id}
          label={<Text size='0.8rem'>{it.name}</Text>}
          description={it.faculty?.toUpperCase()}
        />
      )}
    >
      {children}
    </ListLayout>
  );
}
