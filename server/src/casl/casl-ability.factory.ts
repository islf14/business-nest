import {
  AbilityBuilder,
  createMongoAbility,
  // ExtractSubjectType,
  // InferSubjects,
  // MongoAbility,
  PureAbility,
} from '@casl/ability';
import { UserPayload } from 'src/auth/auth.interface';
import { Action } from 'src/roles/enums/action.enum';
import { User, Company, Category } from 'generated/prisma';
import { PrismaQuery, Subjects } from '@casl/prisma';

// type AppSubjects  = InferSubjects<typeof Company | typeof User> | 'all';
type AppSubjects =
  | Subjects<{
      User: User;
      Company: Company;
      Category: Category;
    }>
  | 'all';

// export type AppAbility = MongoAbility<[Action, AppSubjects ]>;
export type AppAbility = PureAbility<[Action, AppSubjects], PrismaQuery>;

export class CaslAbilityFactory {
  createForUser(user: UserPayload): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    if (user.role === 'ADMIN') {
      can(Action.Manage, 'all'); // read-write access to everything
    }
    // else {
    //   can(Action.Read, 'all'); // read-only access to everything
    // }

    can(Action.Read, 'Category');
    can(Action.Read, 'Company');

    can(Action.Update, 'Company', { userId: user.id });
    cannot(Action.Delete, 'Company', { userId: !user.id });

    return build();
    // {
    //   detectSubjectType: (item) =>
    //     item.constructor as ExtractSubjectType<AppSubjects>,
    // }
  }
}
