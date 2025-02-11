'use client';

import { PropsWithChildren } from 'react';
import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { findAllTerms } from '@/server/terms/actions';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      path={'/admin/terms'}
      queryKey={['terms']}
      getData={findAllTerms}
      actionIcons={[<NewLink key={'new-link'} href='/admin/terms/new' />]}
      renderItem={(it) => <ListItem id={it.id} label={it.id} />}
    >
      {children}
    </ListLayout>
  );
}