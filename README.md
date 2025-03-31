```markdown
# Medusa FCM Notification Plugin

Firebase Cloud Messaging (FCM) push notification provider for Medusa.

## Installation

```bash
npm install medusa-fcm-notification
or 
yarn add medusa-fcm-notification
```

## Configuration

```js
// medusa-config.js
modules: [
  {
    resolve: "@medusajs/medusa/notification",
    options: {
      providers: [
        {
          resolve: `medusa-fcm-notification`,
          id: "fcm",
          options: {
            channels: ["fcm"],
            projectId: process.env.FCM_PROJECT_ID,
            clientEmail: process.env.FCM_CLIENT_EMAIL,
            privateKey: process.env.FCM_PRIVATE_KEY,
          },
        },
      ],
    },
  },
]
```

## Usage

```js
await notificationModuleService.createNotifications([
  {
    to: "DEVICE_FCM_TOKEN",
    template: "-",
    channel: "fcm",
    data: { 
      order_id: "order_123",
      tracking_url: "https://example.com/track/order_123"
    },
    content: {
      subject: "Your order has shipped!",
      text: "Order #123 is on its way!",
    },
  },
]);
```

## Environment Variables

```env
FCM_PROJECT_ID=your-project-id
FCM_CLIENT_EMAIL=your-client-email@project.iam.gserviceaccount.com
FCM_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

## License

MIT
```