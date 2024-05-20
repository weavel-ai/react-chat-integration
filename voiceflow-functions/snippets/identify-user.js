export default async function main(args) {
  const { weavelApiKey, user_id, name, email } = args.inputVars;

  const weavelEndpoint = "https://api.weavel.ai";

  // Set up the headers for the Weavel API request
  const headers = {
    Authorization: `Bearer ${weavelApiKey}`,
    "Content-Type": "application/json",
  };

  try {
    const payload = {
      user_id,
      properties: {
        // Reserved keys (name must be the user's name, and email should be the user's email)
        name,
        email,
        // Add any other user properties you want to track
      },
    };
    // Send the event to Weavel
    const response = await fetch(`${weavelEndpoint}/identify_user`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    // Check response status to confirm event was sent
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Return a success message
    return {
      next: {
        path: "success",
      },
      trace: [
        {
          type: "debug",
          payload: {
            message: "Identify user request successfully sent to Weavel.",
          },
        },
      ],
    };
  } catch (error) {
    // Handle errors in sending the event
    return {
      next: {
        path: "fail",
      },
      trace: [
        {
          type: "debug",
          payload: {
            message: `Failed to send request to Weavel: ${error.message}`,
          },
        },
      ],
    };
  }
}
