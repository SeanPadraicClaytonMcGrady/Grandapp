import { CourierClient } from "@trycourier/courier";

if (!process.env.COURIER_PROD_API_KEY)
  throw new Error("missing Courier api key");

const courier = CourierClient({
  authorizationToken: process.env.COURIER_PROD_API_KEY,
});

export type NotificationEmail = {
  name: string;
};

const constructMessage = (name: string) => {
  return `${name} is appplying in your task in GrandApp.`;
};

export const emailNotification = async (
  contactReq: NotificationEmail,
  userEmail: string
) => {
  const { requestId } = await courier.send({
    message: {
      to: {
        email: userEmail,
      },
      content: {
        title: "Someone contacted you!",
        body: constructMessage(contactReq.name),
      },
      routing: {
        method: "single",
        channels: ["email"],
      },
    },
  });
  console.log(requestId);
};
