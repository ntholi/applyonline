import { ActionIcon, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconTrashXFilled } from '@tabler/icons-react';
import React, { useTransition } from 'react';
import { useQueryState } from 'nuqs';
import { Repository, Resource } from '../repository/repository';

type Props<T extends Resource> = {
  disabled?: boolean;
  repository: Repository<T>;
};

export default function DeleteButton<T extends Resource>({
  disabled,
  repository,
}: Props<T>) {
  const [isPending, startTransition] = useTransition();
  const [id, _] = useQueryState('id');

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Conform Delete',
      centered: true,
      children: <Text size='sm'>Are you sure you want to delete this?</Text>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        startTransition(async () => {
          if (id) {
            await repository.delete(id);
          }
        });
      },
    });

  return (
    <ActionIcon
      color='red'
      aria-label='delete'
      disabled={disabled}
      loading={isPending}
      onClick={openDeleteModal}
    >
      <IconTrashXFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}
