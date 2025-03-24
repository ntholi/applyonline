import { DetailsView, DetailsViewHeader, FieldView } from '@/components/adease';
import { notFound } from 'next/navigation';
import { getUser, deleteUser } from '@/server/users/actions';
import { Badge, Grid, GridCol, Group, Image, Stack, Text } from '@mantine/core';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UserDetails({ params }: Props) {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader
        title={'User'}
        queryKey={['users']}
        handleDelete={async () => {
          'use server';
          await deleteUser(id);
        }}
      />
      <Grid p={'lg'}>
        <GridCol span={6}>
          <Image
            src={largeImage(user.image)}
            w={400}
            fit='contain'
            radius={'lg'}
          />
        </GridCol>
        <GridCol span={6}>
          <Stack gap={'lg'}>
            <FieldView label='ID'>{user.id}</FieldView>
            <FieldView label='Name'>{user.name}</FieldView>
            <FieldView label='Email'>{user.email}</FieldView>
            <Group>
              <Text c='dimmed' size='sm'>
                Role
              </Text>
              <Badge variant='outline'>{user.role}</Badge>
            </Group>
          </Stack>
        </GridCol>
      </Grid>
    </DetailsView>
  );
}

function largeImage(image: string | null | undefined) {
  if (!image) return image;
  const parts = image.split('=');
  if (parts.length > 1) {
    return `${parts[0]}=s500-c`;
  }
  return image;
}
