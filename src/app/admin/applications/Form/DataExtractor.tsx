'use client';

import { Button, FileInput, Grid, GridCol } from '@mantine/core';
import { IconFileUpload } from '@tabler/icons-react';
import React, { useState } from 'react';
import { extractData } from '@/server/applications/ai-staff';

export default function DataExtractor() {
  const [file, setFile] = useState<File | null>(null);

  async function extractDate() {
    if (!file) return;
    const text = await extractData(file);
    console.log(text);
  }

  return (
    <Grid align='end'>
      <GridCol span={10}>
        <FileInput
          label='Document'
          value={file}
          onChange={(file) => setFile(file)}
        />
      </GridCol>
      <GridCol span={2}>
        <Button
          type='button'
          onClick={extractDate}
          leftSection={<IconFileUpload size={'1rem'} />}
        >
          Extract
        </Button>
      </GridCol>
    </Grid>
  );
}
