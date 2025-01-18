'use client';

import { PropsWithChildren } from 'react';
import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { findAllQualifications } from '@/server/qualifications/actions';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      path={'/admin/qualifications'}
      queryKey={['qualifications']}
      getData={findAllQualifications}
      actionIcons={[
        <NewLink key={'new-link'} href='/admin/qualifications/new' />,
      ]}
      renderItem={(it) => <ListItem id={it.id} label={it.name} />}
    >
      {children}
    </ListLayout>
  );
}
