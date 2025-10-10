import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import fs from 'fs';
import { join } from 'path';

const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class FileService {
  async deleteUploadedFile(name: string): Promise<void> {
    const fullPath = join(process.cwd(), `public/uploads/${name}`);
    try {
      await unlinkAsync(fullPath);
    } catch (e: unknown) {
      if (e instanceof Error) return;
    }
  }
}
