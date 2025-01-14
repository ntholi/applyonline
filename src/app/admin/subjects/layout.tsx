'use client';

import { PropsWithChildren } from 'react';
import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { findAllSubjects } from '@/server/subjects/actions';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      path={'/admin/subjects'}
      queryKey={['subjects']}
      getItems={findAllSubjects}
      actionIcons={[<NewLink key={'new-link'} href='/admin/subjects/new' />]}
      renderItem={(it) => <ListItem id={it.id} label={it.id} />}
    >
      {children}
    </ListLayout>
  );
}