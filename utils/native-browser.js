import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";

export const openBrowser = async (url) => {
  // Open the browser only if we are on a native platform (in-app)
  if (Capacitor.isNativePlatform()) {
    await Browser.open({
      url,
      presentationStyle: "popover",
    });
  } else {
    window.location.href = url;
  }
};

export const closeBrowser = async () => {
  if (Capacitor.isNativePlatform()) {
    await Browser.close();
  }
};
