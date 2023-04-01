// TODO: will use .env instead in the later homework related env content
export default {
    postgres: {
        host: 'mouse.db.elephantsql.com',
        user: 'fhpeduef',
        password: 'gEEwsAtD2tfR2V-Qe7w19JBF1Nrknyss',
        database: 'fhpeduef',
        port: 5432
    },
    port: 3000,
    api_base_url: '/api/v1',
    jwt_key: '4a380a09-3aab-401b-a620-1372b7e8c77a',
    token_headers_field: 'authorization',
    jwt_prefix: 'Bearer',
    token_expires: '20m'
};
