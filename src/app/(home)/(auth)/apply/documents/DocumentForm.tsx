'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { uploadDocument } from '@/lib/storage';
import { createDocument } from '@/server/documents/actions';
import { DocumentType } from '@/types';
import { Loader2, Plus, Trash2, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DocumentFormProps {
  studentId: number;
}

interface DocumentUpload {
  type: DocumentType;
  file: File | null;
}

export default function DocumentForm({ studentId }: DocumentFormProps) {
  const [documents, setDocuments] = useState<DocumentUpload[]>([
    { type: 'Certificate', file: null },
    { type: 'ID', file: null },
  ]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  function addDocument() {
    setDocuments([...documents, { type: 'Other', file: null }]);
  }

  function removeDocument(index: number) {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
  }

  function updateDocument(
    index: number,
    field: keyof DocumentUpload,
    value: DocumentUpload[keyof DocumentUpload],
  ) {
    const newDocuments = [...documents];
    newDocuments[index] = { ...newDocuments[index], [field]: value };
    setDocuments(newDocuments);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);

    try {
      // Validate required documents
      const hasResults = documents.some(
        (doc) =>
          (doc.type === 'Certificate' || doc.type === 'Statement of Results') &&
          doc.file,
      );
      const hasId = documents.some(
        (doc) => (doc.type === 'ID' || doc.type === 'Passport') && doc.file,
      );

      if (!hasResults || !hasId) {
        throw new Error(
          'Please upload both your Certificate/Results and ID/Passport documents',
        );
      }

      // Upload all documents
      for (const doc of documents) {
        if (!doc.file) continue;

        const url = await uploadDocument(doc.file);
        await createDocument({
          studentId,
          name: doc.file.name,
          file: url,
          type: doc.type,
        });
      }

      router.push('/apply/review');
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : 'Failed to upload documents',
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>
            Please upload your Certificate/Results and ID/Passport documents.
            You can add additional documents if needed.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {documents.map((doc, index) => (
            <div
              key={index}
              className='flex items-start gap-4 rounded-lg border p-4'
            >
              <div className='flex-1 space-y-4'>
                <div>
                  <Label>Document Type</Label>
                  <Select
                    value={doc.type}
                    onValueChange={(value) =>
                      updateDocument(index, 'type', value as DocumentType)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Certificate'>Certificate</SelectItem>
                      <SelectItem value='Statement of Results'>
                        Statement of Results
                      </SelectItem>
                      <SelectItem value='ID'>ID</SelectItem>
                      <SelectItem value='Passport'>Passport</SelectItem>
                      <SelectItem value='Other'>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>File</Label>
                  <Input
                    type='file'
                    accept='image/*,.pdf'
                    onChange={(e) =>
                      updateDocument(index, 'file', e.target.files?.[0] || null)
                    }
                    required
                  />
                </div>
              </div>

              {index > 1 && (
                <Button
                  type='button'
                  variant='destructive'
                  size='icon'
                  onClick={() => removeDocument(index)}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              )}
            </div>
          ))}

          <div className='flex justify-between'>
            <Button type='button' variant='outline' onClick={addDocument}>
              <Plus className='mr-2 h-4 w-4' />
              Add Document
            </Button>

            <Button type='submit' disabled={uploading}>
              {uploading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Upload className='mr-2 h-4 w-4' />
              )}
              Upload Documents
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
