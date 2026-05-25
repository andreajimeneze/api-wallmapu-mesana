import 'dotenv/config';

export const env = {
    port: Number(process.env.PORT) || 3000,
    database: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        name: process.env.DB_NAME, 
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    cloudinary: {
        cloudinary_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    },
    google: {
        google_id: process.env.GOOGLE_CLIENT_ID,
        google_secret: process.env.GOOGLE_CLIENT_SECRET
    },
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        jwt_refresh_token: process.env.JWT_REFRESH_TOKEN
    },
    brevo: {
        api_key: process.env.BREVO_API_KEY,
        from_email: process.env.BREVO_FROM_EMAIL,
        from_name: process.env.BRERVO_FROM_NAME

    }
}