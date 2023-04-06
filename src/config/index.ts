import dotenv from 'dotenv';

dotenv.config();

export default {
    postgres: {
        host: process.env.POSTGRES_HOST || 'localhost',
        user: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DATABASE || 'test',
        port: process.env.POSTGRES_PORT || 5432
    },
    port: process.env.SERVER_PORT || 3000,
    api_base_url: process.env.API_BASE_URL || 'api/v1',
    jwt_key: process.env.JWT_KEY || 'your_jwt_default_key',
    token_headers_field: process.env.JWT_HEADERS_FIELD || 'authorization',
    token_expires: process.env.JWT_TOKEN_EXPIRES || '20m'
};
