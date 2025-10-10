import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream, promises } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
  @Get(':name')
  async getFile(@Param('name') name: string): Promise<StreamableFile> {
    const fullPath = join(process.cwd(), `public/uploads/${name}`);
    try {
      await promises.access(fullPath);
    } catch (e: unknown) {
      if (e instanceof Error)
        throw new HttpException(`Does not exist`, HttpStatus.NOT_FOUND);
    }

    const file = createReadStream(fullPath);
    return new StreamableFile(file, {
      type: 'image/jpeg',
      disposition: `inline; filename="${name}"`,
    });
  }
}

// type: 'application/json or image/jpg'
// disposition: 'attachment or inline; filename="package.json"'
