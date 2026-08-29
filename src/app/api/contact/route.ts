import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(4000),
  company: z.string().max(0).optional(),
});

const rateLimitWindow = 15 * 60 * 1000;
const rateLimitMax = 5;
const attempts = new Map<string, number[]>();

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isRateLimited(identifier: string) {
  const now = Date.now();
  const recent = (attempts.get(identifier) ?? []).filter(
    (timestamp) => now - timestamp < rateLimitWindow,
  );

  if (recent.length >= rateLimitMax) {
    attempts.set(identifier, recent);
    return true;
  }

  recent.push(now);
  attempts.set(identifier, recent);
  return false;
}

export async function POST(request: Request) {
  const identifier =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous";

  if (isRateLimited(identifier)) {
    return Response.json(
      { message: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { message: "Please check the form and try again." },
      { status: 400 },
    );
  }

  if (parsed.data.company) {
    return Response.json({ message: "Message sent." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    "Portfolio <portfolio@myomyatthiha.com>";

  if (!apiKey || !to) {
    return Response.json(
      { message: "Email is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: parsed.data.email,
    subject: `Portfolio enquiry from ${parsed.data.name}`,
    html: `
      <h1>New portfolio enquiry</h1>
      <p><strong>Name:</strong> ${escapeHtml(parsed.data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(parsed.data.email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(parsed.data.message).replaceAll("\n", "<br>")}</p>
    `,
  });

  if (error) {
    console.error("Resend delivery failed.", error);
    return Response.json(
      { message: "The message could not be sent. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ message: "Message sent. Thank you." });
}
