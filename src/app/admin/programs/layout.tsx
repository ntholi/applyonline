'use client';

import { PropsWithChildren } from 'react';
import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { getPrograms } from '@/server/programs/actions';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      path={'/admin/programs'}
      queryKey={['programs']}
      getData={getPrograms}
      actionIcons={[<NewLink key={'new-link'} href='/admin/programs/new' />]}
      renderItem={(it) => <ListItem id={it.id} label={it.id} />}
    >
      {children}
    </ListLayout>
  );
}