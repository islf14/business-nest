import { AppAbility } from './casl-ability.factory';
import { Action } from 'src/roles/enums/action.enum';
import { Company } from 'src/roles/entities';

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;
export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

//

export class ReadCompanyPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Company);
  }
}
