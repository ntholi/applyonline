'use client';

import { PropsWithChildren } from 'react';
import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { findAllDocuments } from '@/server/documents/actions';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      path={'/admin/documents'}
      queryKey={['documents']}
      getData={findAllDocuments}
      actionIcons={[<NewLink key={'new-link'} href='/admin/documents/new' />]}
      renderItem={(it) => <ListItem id={it.id} label={it.id} />}
    >
      {children}
    </ListLayout>
  );
}