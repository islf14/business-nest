import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import fs from 'fs';
import { join } from 'path';
import { del, put } from '@vercel/blob';

const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class FileService {
  // Delete uploaded file - Used in category update and delete
  async deleteUploadedFile(name: string): Promise<void> {
    const fullPath = join(process.cwd(), `public/uploads/${name}`);
    try {
      await unlinkAsync(fullPath);
      return;
    } catch (e: unknown) {
      if (e instanceof Error) {
        const m = e.message.trim().replace(/(\r\n|\n|\r)/gm, '');
        console.error(new Date().toLocaleString() + ' File not found:', m);
      }
      return;
    }
  }

  // Upload file to vercer
  async uploadFile(fileBuffer: Buffer, fileName: string) {
    try {
      const blob = await put(fileName, fileBuffer, {
        access: 'public', // Or 'private'
        addRandomSuffix: true,
      });
      return blob.url;
    } catch (e: unknown) {
      if (e instanceof Error) {
        const m = e.message.trim().replace(/(\r\n|\n|\r)/gm, '');
        console.error(
          new Date().toLocaleString() + ' File was not uploaded:',
          m,
        );
      }
      return null;
    }
  }

  async deleteFileByUrl(fileUrl: string): Promise<void> {
    try {
      await del(fileUrl);
    } catch (e: unknown) {
      if (e instanceof Error) {
        const m = e.message.trim().replace(/(\r\n|\n|\r)/gm, '');
        console.error(
          new Date().toLocaleString() + ' File was not deleted:',
          m,
        );
      }
      return;
    }
  }
}
