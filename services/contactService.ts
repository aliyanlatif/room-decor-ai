import { ContactFormData } from "@/types";
import { API_ENDPOINTS } from "@/constants/api";

interface ContactResponse {
  success: boolean;
  message: string;
  mailtoLink?: string;
}

/**
 * Submits a contact form message
 * @param formData - The contact form data (name, email, message)
 * @returns Promise with submission result
 * @throws Error if the submission fails
 */
export async function submitContactForm(
  formData: ContactFormData
): Promise<ContactResponse> {
  try {
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error("All fields are required");
    }

    const response = await fetch(API_ENDPOINTS.CONTACT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Failed to send message: ${response.statusText}`
      );
    }

    const data: ContactResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while sending the message");
  }
}

