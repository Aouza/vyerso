// Com NODE_ENV=test o @next/env ignora .env.local; carregamos direto (Node >= 20.12).
process.loadEnvFile(".env.local");
