import { AppAbility } from './casl-ability.factory';
import { Action } from 'src/roles/enums/action.enum';
// import { Company } from 'src/roles/entities';

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}
type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

//
//

export class ReadCompanyPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, 'Company');
  }
}

export class CreateCompanyPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, 'Company');
  }
}

export class UpdateCompanyPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, 'Company');
  }
}

export class DeleteCompanyPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, 'Company');
  }
}

//

export class ReadCategoryPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, 'Category');
  }
}

export class CreateCategoryPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, 'Category');
  }
}

export class UpdateCategoryPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, 'Category');
  }
}

export class DeleteCategoryPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, 'Category');
  }
}
