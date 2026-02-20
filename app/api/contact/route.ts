import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

// Store contact submissions in memory for demo
// In production, send email or store in database
const submissions: unknown[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // Store submission (in production, send email instead)
    const submission = {
      id: crypto.randomUUID(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    };
    
    submissions.push(submission);
    
    // Log for debugging (remove in production)
    console.log("Contact form submission:", submission);

    // TODO: Send email using a service like Resend, SendGrid, or Nodemailer
    // Example with Resend:
    // await resend.emails.send({
    //   from: "contact@savoryandsage.com",
    //   to: "info@savoryandsage.com",
    //   subject: `Contact Form: ${subject}`,
    //   text: `From: ${name} <${email}>\n\n${message}`,
    // });

    return NextResponse.json(
      { message: "Message sent successfully", id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

// For admin dashboard - get all submissions (protected by middleware)
export async function GET() {
  return NextResponse.json(submissions);
}
