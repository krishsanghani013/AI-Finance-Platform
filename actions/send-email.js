import { Resend } from "resend";

export async function sendEmail({ to, subject, react }) {
    const resend = new Resend(process.env.RESEND_API_KEY || "");

    try {
        const { data, error } = await resend.emails.send({
            from: "Flowoid AI Finance <onboarding@resend.dev>",
            to,
            subject,
            react,
        });

        if (error) {
            console.error("Resend API error:", error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { success: false, error };
    }
}
