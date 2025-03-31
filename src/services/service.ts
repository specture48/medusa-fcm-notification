import { Logger, NotificationTypes } from "@medusajs/framework/types";
import {
  AbstractNotificationProviderService,
  MedusaError,
} from "@medusajs/framework/utils";
import * as admin from "firebase-admin";

type InjectedDependencies = {
  logger: Logger;
};

interface FcmServiceConfig {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

export class FcmNotificationService extends AbstractNotificationProviderService {
  static identifier = "fcm";
  protected logger_: Logger;

  constructor({ logger }: InjectedDependencies, options: FcmServiceConfig) {
    super();

    const firebaseConfig = {
      projectId: options.projectId,
      clientEmail: options.clientEmail,
      privateKey: options.privateKey?.replace(/\\n/g, "\n"),
    };

    this.logger_ = logger;

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig),
        projectId: options.projectId,
      });
    }
  }

  async send(
    notification: NotificationTypes.ProviderSendNotificationDTO,
  ): Promise<NotificationTypes.ProviderSendNotificationResultsDTO> {
    if (!notification) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `No notification information provided`,
      );
    }

    const { to, content, data } = notification;

    // Validate single recipient
    if (!to || typeof to !== "string") {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Invalid or missing device token`,
      );
    }

    if (!content?.subject || !content?.text) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Notification content must contain subject and text`,
      );
    }

    const message = {
      token: to,
      notification: {
        title: content.subject,
        body: content.text,
      },
      data: (data as { [key: string]: string }) || {},
    };

    try {
      await admin.messaging().send(message);
      return {};
    } catch (error) {
      this.logger_.error(`FCM send error: ${error.message}`);
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to send FCM notification: ${error.message}`,
      );
    }
  }
}
