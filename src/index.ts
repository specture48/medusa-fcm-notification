import { ModuleProvider, Modules } from "@medusajs/framework/utils";
import { FcmNotificationService } from "./services/service";

const services = [FcmNotificationService];

export default ModuleProvider(Modules.NOTIFICATION, {
  services,
});
