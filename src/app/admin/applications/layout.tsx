'use client';

import { PropsWithChildren } from 'react';
import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { findAllApplications } from '@/server/applications/actions';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      path={'/admin/applications'}
      queryKey={['applications']}
      getData={findAllApplications}
      actionIcons={[<NewLink key={'new-link'} href='/admin/applications/new' />]}
      renderItem={(it) => <ListItem id={it.id} label={it.id} />}
    >
      {children}
    </ListLayout>
  );
}