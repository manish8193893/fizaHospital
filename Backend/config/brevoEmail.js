const BREVO_TRANSACTIONAL_EMAIL_URL = 'https://api.brevo.com/v3/smtp/email';

export async function sendBrevoEmail({ to, recipientName, subject, htmlContent, textContent }) {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL;

    if (!apiKey) {
        throw new Error('BREVO_API_KEY is not configured in the backend environment');
    }
    if (!senderEmail) {
        throw new Error('SENDER_EMAIL is not configured in the backend environment');
    }

    const response = await fetch(BREVO_TRANSACTIONAL_EMAIL_URL, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'api-key': apiKey,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            sender: { name: 'Fiza Hospital', email: senderEmail },
            to: [{ email: to, name: recipientName }],
            subject,
            htmlContent,
            textContent,
        }),
    });

    const responseText = await response.text();
    let result = {};
    if (responseText) {
        try {
            result = JSON.parse(responseText);
        } catch {
            result = {};
        }
    }

    if (!response.ok) {
        const providerMessage = typeof result.message === 'string' ? result.message : 'Request rejected';
        throw new Error(`Brevo email API returned ${response.status}: ${providerMessage}`);
    }

    return result;
}
