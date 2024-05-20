export default async function main(args) {
  const { weavelApiKey, name, user_id } = args.inputVars;

  const weavelEndpoint = "https://api.weavel.ai";

  // Set up the headers for the Weavel API request
  const headers = {
    Authorization: `Bearer ${weavelApiKey}`,
    "Content-Type": "application/json",
  };

  try {
    // Fetch the user's most recent trace ID
    const traceRes = await fetch(`${weavelEndpoint}/traces/recent/${user_id}`, {
      method: "GET",
      headers: headers,
    });

    if (!traceRes.ok) {
      throw new Error(
        `HTTP error when fetching recent trace! status: ${traceRes.status}`
      );
    }

    // return {
    //   trace: [{
    //     type: 'debug',
    //     payload: {
    //       message: JSON.stringify(traceRes)
    //     }
    //   }]
    // }

    const trace = traceRes.json;

    if (trace === null) {
      throw new Error("Trace doesn't exist for this user");
    }

    const payload = {
      name,
      user_id,
      trace_id: trace.trace_id,
      // properties // optional
    };
    // Send the event to Weavel
    const logRes = await fetch(`${weavelEndpoint}/capture/track_event`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    // Check logRes status to confirm event was sent
    if (!logRes.ok) {
      throw new Error(
        `HTTP error when logging track event! status: ${logRes.status}`
      );
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
            message: "Track event successfully sent to Weavel.",
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
            message: `Failed to send event to Weavel: ${error.message}`,
          },
        },
      ],
    };
  }
}
