import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import { PoliciesGuard } from 'src/casl/policies.guard';
import {
  CreateCompanyPolicyHandler,
  DeleteCompanyPolicyHandler,
  ReadCompanyPolicyHandler,
  UpdateCompanyPolicyHandler,
} from 'src/casl/casl.interface';

@Controller('companies')
@UseGuards(PoliciesGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @CheckPolicies(new CreateCompanyPolicyHandler())
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @CheckPolicies(new ReadCompanyPolicyHandler())
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @CheckPolicies(new ReadCompanyPolicyHandler())
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Patch(':id')
  @CheckPolicies(new UpdateCompanyPolicyHandler())
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @CheckPolicies(new DeleteCompanyPolicyHandler())
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
