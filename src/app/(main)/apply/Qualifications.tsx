'use client';
import {
  Certificate,
  GradingScheme,
} from '@/app/(admin)/admin/certificates/Certificate';
import { certificateRepository } from '@/app/(admin)/admin/certificates/repository';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Select,
  SelectItem,
  Skeleton,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react';
import React, { Key, useEffect, useTransition } from 'react';
import { User } from 'firebase/auth';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';
import { Results } from '@/app/(admin)/admin/applications/modals/Results';
import ResultsForm from './ResultsForm';
import { IconTrash } from '@tabler/icons-react';
import { Application } from '@/app/(admin)/admin/applications/modals/Application';

type Props = {
  user: User;
};
export default function Qualifications({ user }: Props) {
  const [certificate, setCertificate] = React.useState<Certificate>();
  const [application, setApplication] = React.useState<Application>();
  useEffect(() => {
    return applicationsRepository.listenForDocument(user.uid, (data) => {
      setApplication(data);
    });
  }, [user]);

  return (
    <div className='w-full'>
      <CertificateInput setValue={setCertificate} value={certificate} />
      {certificate && (
        <>
          <div className='mt-10'>
            <Divider className='mt-1 mb-5' />
            <div className='flex justify-between'>
              <div>
                <h2>Add your results</h2>
                <p></p>
              </div>
              <ResultsForm user={user} certificate={certificate} />
            </div>
          </div>
          <div className='mt-2'>
            <ResultsTable application={application} />
          </div>
        </>
      )}
    </div>
  );
}

function ResultsTable({ application }: { application?: Application }) {
  const results = application?.results ?? [];
  return (
    <Table>
      <TableHeader>
        <TableColumn>Course</TableColumn>
        <TableColumn>Grade</TableColumn>
        <TableColumn>{''}</TableColumn>
      </TableHeader>
      <TableBody>
        {results.map((result) => (
          <TableRow key={result.course}>
            <TableCell>{result.course}</TableCell>
            <TableCell>{result.grade.grade}</TableCell>
            <TableCell className='flex justify-end'>
              <Button
                isIconOnly
                color='danger'
                aria-label='Delete'
                size='sm'
                onClick={() => {
                  applicationsRepository.removeResult(application!.id, result);
                }}
              >
                <IconTrash size={'1rem'} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

type CertificateProps = {
  setValue: (value: Certificate | undefined) => void;
  value: Certificate | undefined;
};

function CertificateInput({ setValue, value }: CertificateProps) {
  const [loading, setLoading] = React.useState(true);
  const [certificates, setCertificates] = React.useState<Certificate[]>([]);

  useEffect(() => {
    certificateRepository
      .getAll()
      .then((data) => {
        setCertificates([
          ...data,
          {
            courses: [],
            gradingSchemes: [],
            id: '0',
            name: 'Other',
            passingGrade: null,
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton className='w-full h-14 rounded-lg' />
      ) : (
        <Autocomplete
          label='Highest Qualification'
          className='w-full'
          selectedKey={value?.id}
          onSelectionChange={(item: Key) => {
            setValue(certificates.find((c) => c.id === item));
          }}
          defaultItems={certificates}
          description={!value && 'Please select your highest qualification'}
          isLoading={loading}
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
          )}
        </Autocomplete>
      )}
    </>
  );
}
