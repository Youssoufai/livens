import { useEffect } from "react";
import {
  LogLevel,
  NotificationClickEvent,
  NotificationWillDisplayEvent,
  OneSignal,
} from "react-native-onesignal";
import { router } from "expo-router";

type NotificationData = {
  type: "chat" | "request";
  conversation_id?: string;
  request_id?: string;
  receiver_id?: string;
};

function handleNotificationNavigation(data: NotificationData) {
  if (
    data.type === "chat" &&
    data.conversation_id &&
    data.request_id &&
    data.receiver_id
  ) {
    router.push({
      pathname: "/(requests)/chat",
      params: {
        conversationId: data.conversation_id,
        requestId: data.request_id,
        receiverId: data.receiver_id,
      },
    });
  } else if (data.type === "request" && data.request_id) {
    router.push({
      pathname: "/(requests)/request-details",
      params: { id: data.request_id },
    });
  }
}

export default function useOneSignalPushNotification() {
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    OneSignal.initialize(process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID ?? "");

    OneSignal.Notifications.requestPermission(true);

    const handleClick = (event: NotificationClickEvent) => {
      const data = event.notification.additionalData as
        | NotificationData
        | undefined;
      if (data?.type) {
        handleNotificationNavigation(data);
      }
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
