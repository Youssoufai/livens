import { useEffect } from "react";
import {
  LogLevel,
  NotificationClickEvent,
  NotificationWillDisplayEvent,
  OneSignal,
} from "react-native-onesignal";

export default function useOneSignalPushNotification() {
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    OneSignal.initialize(process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID ?? "");

    OneSignal.Notifications.requestPermission(true);

    const handleClick = (event: NotificationClickEvent) => {
      console.log("OneSignal: notification clicked:", event);
    };

    const handleForegroundDisplay = (event: NotificationWillDisplayEvent) => {
      event.getNotification().display();
    };

    OneSignal.Notifications.addEventListener("click", handleClick);
    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      handleForegroundDisplay,
    );

    return () => {
      OneSignal.Notifications.removeEventListener("click", handleClick);
      OneSignal.Notifications.removeEventListener(
        "foregroundWillDisplay",
        handleForegroundDisplay,
      );
    };
  }, []);
}
