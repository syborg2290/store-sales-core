export const jwtConstants = {
    secret: process.env.SECRET_JWT,
    expiresIn: process.env.EXPIRES_IN_JWT || '60s',
};
