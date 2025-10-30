import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;

    console.log(` Webhook received: ${eventType} - ID: ${id}`);
    console.log(" Payload:", evt.data);

    if (eventType === "user.created" || eventType === "user.updated") {
      const {
        id,
        email_addresses,
        first_name,
        last_name,
        image_url,
        username,
      } = evt.data;

      try {
        await createOrUpdateUser({
          id,
          email_addresses,
          first_name,
          last_name,
          image_url,
          username,
        });

        console.log("✅ User created/updated successfully in DB");
      } catch (error) {
        console.error(" Error creating or updating user:", error);
      }
    }

   
    if (eventType === "user.deleted") {
      const { id } = evt?.data;

      try {
        await deleteUser(id); 
        console.log("🗑️ User deleted successfully:", id);
        return new Response("User is deleted", { status: 200 });
      } catch (error) {
        console.error(" Error deleting user:", error);
        return new Response("Error occurred while deleting user", {
          status: 400,
        });
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (err) {
    console.error(" Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
