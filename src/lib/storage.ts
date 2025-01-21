'use server';

import { auth } from '@/auth';
import { nanoid } from 'nanoid';
import { unauthorized } from 'next/navigation';
import { adminStorage } from './firebase-admin';

export async function uploadDocument(file: File) {
  const session = await auth();
  if (!session) {
    return unauthorized();
  }
  try {
    if (!file || !(file instanceof File)) {
      throw new Error(`Invalid file input, file: ${file}`);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split('.').pop()?.toLowerCase() || 'unknown';
    const fileName = `${nanoid()}.${ext}`;

    const fileRef = adminStorage.bucket().file(fileName);
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
      },
      public: true,
    });

    return fileRef.publicUrl();
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
}

export async function deleteDocument(url: string | undefined | null) {
  const session = await auth();
  if (!url) return;
  if (!session) {
    return unauthorized();
  }

  const fileName = formatUrl(url).split('/').pop();
  if (!fileName) return;

  try {
    const fileRef = adminStorage.bucket().file(fileName);
    const [exists] = await fileRef.exists();

    if (!exists) {
      console.log('File does not exist', fileName);
      throw new Error('File does not exist');
    }

    await fileRef.delete();
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

// replace %2F with /
function formatUrl(url: string | undefined | null) {
  if (!url) return '';
  return url.replace(/%2F/g, '/');
}
