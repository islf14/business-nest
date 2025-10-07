export const jwtConstants = {
  secret: process.env.SECRET ?? 'hi',
};

export const saltOrRounds = process.env.SALT ?? 10;
