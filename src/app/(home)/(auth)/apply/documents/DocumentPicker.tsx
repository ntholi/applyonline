'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Document } from './DocumentForm';
import { documentTypes } from '@/db/schema';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useState } from 'react';

type Props = {
  setValue: (value: Document) => void;
};

export default function DocumentPicker({ setValue }: Props) {
  const [selectedType, setSelectedType] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const isMobile = useMediaQuery('(max-width: 640px)');

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  function handleSubmit() {
    if (selectedType && selectedFile) {
      setValue({
        type: selectedType as (typeof documentTypes)[number],
        file: selectedFile,
      });
    }
  }

  const content = (
    <div className='grid gap-4 py-4'>
      <div className='grid gap-2'>
        <Label htmlFor='document-type'>Document Type</Label>
        <Select onValueChange={setSelectedType} value={selectedType}>
          <SelectTrigger>
            <SelectValue placeholder='Select document type' />
          </SelectTrigger>
          <SelectContent>
            {documentTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='document-file'>Upload Document</Label>
        <Input
          id='document-file'
          type='file'
          accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
          onChange={handleFileChange}
        />
        <p className='text-sm text-muted-foreground'>
          Supported formats: PDF, DOC, DOCX, JPG, PNG
        </p>
      </div>
      <Button 
        onClick={handleSubmit}
        disabled={!selectedType || !selectedFile}
        className='mt-2'
      >
        Add Document
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='outline'>Add Document</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add Document</DrawerTitle>
          </DrawerHeader>
          <div className='px-4'>{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Add Document</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Document</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
