import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // For now, we'll log the contact form data
    // In production, you would integrate with an email service like:
    // - Resend
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES
    
    console.log("Contact form submission:");
    console.log("To: aliyan.l@dplit.com");
    console.log("Subject:", name);
    console.log("From:", email);
    console.log("Message:", message);

    // Here's where you would send the actual email
    // Example with a hypothetical email service:
    /*
    await emailService.send({
      to: "aliyan.l@dplit.com",
      from: email,
      subject: name,
      text: message,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    */

    // For development, create a mailto link alternative
    const mailtoLink = `mailto:aliyan.l@dplit.com?subject=${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(
      `From: ${name} (${email})\n\nMessage:\n${message}`
    )}`;

    return NextResponse.json({
      success: true,
      message: "Message received successfully",
      mailtoLink, // Can be used as fallback
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}

