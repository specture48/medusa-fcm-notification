```markdown
# Medusa FCM Notification Plugin

Firebase Cloud Messaging (FCM) push notification provider for Medusa.  
Supports sending to both **device tokens** and **topics** using `fcm` and `fcm-topic` channels.
```
## Installation

```bash
npm install medusa-fcm-notification
```

or

```bash
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
            channels: ["fcm-token", "fcm-topic"],
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

You can send push notifications to:

- Individual devices using an **FCM token**
- Groups of devices using an **FCM topic**

### Send to Device Token

Use the `fcm` channel and provide the target device's FCM token in the `to` field.

```js
await notificationModuleService.createNotifications([
  {
    to: "DEVICE_FCM_TOKEN",
    channel: "fcm-token",
    template: "-",
    data: {
      order_id: "order_123",
    },
    content: {
      subject: "Your order has shipped!",
      text: "Track your order here: https://example.com/track/order_123",
    },
  },
]);
```

### Send to Topic

Use the `fcm-topic` channel and provide the topic name prefixed with `/topics/` in the `to` field.

```js
await notificationModuleService.createNotifications([
  {
    to: "/topics/order-updates",
    channel: "fcm-topic",
    template: "-",
    data: {
      promotion: true,
    },
    content: {
      subject: "Big Sale Alert!",
      text: "Our biggest sale of the year starts now!",
    },
  },
]);
```

## Environment Variables

```env
FCM_PROJECT_ID=your-project-id
FCM_CLIENT_EMAIL=your-client-email@project.iam.gserviceaccount.com
FCM_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_KEY_HERE\\n-----END PRIVATE KEY-----\\n"
```


## License

MIT
```