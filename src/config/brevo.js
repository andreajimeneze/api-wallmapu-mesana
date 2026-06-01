import { BrevoClient } from "@getbrevo/brevo";
import { env } from './env.js';

async function main() {
    const client = new BrevoClient({
        apiKey: env.brevo.api_key
    });
    await client.account.getAccount();
}
main();
