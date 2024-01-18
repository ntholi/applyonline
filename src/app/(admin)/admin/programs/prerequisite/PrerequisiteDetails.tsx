import {
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Skeleton,
  Box,
  BoxProps,
  Title,
  Divider,
  Paper,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQueryState } from 'nuqs';
import React, { useEffect, useState } from 'react';
import { Certificate } from '../../certificates/Certificate';
import { db } from '@/lib/config/firebase';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import PrerequisiteForm from './PrerequisiteForm';

export default function PrerequisiteDetails(props: BoxProps) {
  const [certificateName] = useQueryState('certificate');
  const [programId] = useQueryState('id');
  const [certificate, setCertificate] = React.useState<Certificate>();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (certificateName && programId) {
      setLoading(true);
      const q = query(
        collection(db, 'certificates'),
        where('name', '==', certificateName)
      );
      getDocs(q).then((snapshot) => {
        snapshot.forEach((doc) => {
          setCertificate({ ...doc.data(), id: doc.id } as Certificate);
        });
        setLoading(false);
      });
    }
  }, [certificateName, programId]);

  return (
    <Box {...props}>
      {loading ? (
        <Loader />
      ) : (
        certificate && <PrerequisiteForm certificate={certificate} />
      )}
    </Box>
  );
}

function Loader() {
  return (
    <Stack>
      <Group justify='space-between'>
        <Skeleton w={200} h={30} />
        <Skeleton w={100} h={30} />
      </Group>
      <Stack gap={'xs'}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} w='100%' h={50} />
        ))}
      </Stack>
    </Stack>
  );
}
