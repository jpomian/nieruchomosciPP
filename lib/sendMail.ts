'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitForm(formData: FormData) {
  const email = formData.get('email')?.toString().trim();
  const message = formData.get('message')?.toString().trim();
  const RECEIVER = "jpomianowski@outlook.com" // elzbieta.pomianowska@gmail.com

  if (!email || !message) {
    return { error: 'Wypełnij wszystkie pola.' };
  }

  try {
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Use your verified domain in production
      to: RECEIVER,
      replyTo: email,
      subject: `[Nieruchomosci pod parasolem] Nowa wiadomość od: ${email}`,
      html: `
        <h2>New submission</h2>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p>${message}</p>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: 'Failed to send message.' };
  }
}