import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { UserPayload } from 'src/auth/auth.interface';
import { Company, User } from 'src/roles/entities';
import { Action } from 'src/roles/enums/action.enum';

type Subjects = InferSubjects<typeof Company | typeof User> | 'all';
export type AppAbility = MongoAbility<[Action, Subjects]>;

export class CaslAbilityFactory {
  createForUser(user: UserPayload) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (user.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    can(Action.Update, Company, { authorId: user.id });
    cannot(Action.Delete, Company, { isPublished: true });

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
