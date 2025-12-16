import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/utils/supabaseClient";
import { toast } from "sonner";
import { Capacitor } from "@capacitor/core";

export function useSubscription() {
  const { user } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPro, setIsPro] = useState(false);

  const presentPaywall = useCallback(async () => {
    if (!user || isProcessing) return;

    setIsProcessing(true);
    try {
      const { Purchases, LOG_LEVEL } = await import(
        "@revenuecat/purchases-capacitor"
      );

      // console.log("user", user);
      await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
      await Purchases.configure({
        apiKey: process.env.NEXT_PUBLIC_REVENUECAT_API_KEY,
        appUserID: user.id,
      });
      await Purchases.setAttributes({
        $email: user.email,
        $name: user.full_name || "",
      });

      const { RevenueCatUI } = await import(
        "@revenuecat/purchases-capacitor-ui"
      );
      const { PAYWALL_RESULT } = await import(
        "@revenuecat/purchases-capacitor"
      );
      const { result } = await RevenueCatUI.presentPaywall();

      if (
        result === PAYWALL_RESULT.PURCHASED ||
        result === PAYWALL_RESULT.RESTORED
      ) {
        const { error } = await supabase
          .from("profiles")
          .update({ subscription: "pro" })
          .eq("id", user.id);

        if (error) throw error;

        toast.success("Success! Your subscription is active.");
        router.reload();
      }
    } catch (e) {
      console.error("Paywall presentation error:", e);
      toast.error("An error occurred while showing the paywall.");
    } finally {
      setIsProcessing(false);
    }
  }, [user, isProcessing, router]);

  const checkSubscription = useCallback(async () => {
    if (!user) return;
    setIsProcessing(true);
    try {
      const { Purchases } = await import("@revenuecat/purchases-capacitor");
      await Purchases.configure({
        apiKey: process.env.NEXT_PUBLIC_REVENUECAT_API_KEY,
        appUserID: user.id,
      });

      const { customerInfo } = await Purchases.getCustomerInfo();
      const isSubscribed =
        customerInfo?.entitlements?.active?.Pro !== undefined;

      setIsPro(isSubscribed);

      const currentDBStatus = user.subscription === "pro";
      if (isSubscribed !== currentDBStatus) {
        await supabase
          .from("profiles")
          .update({ subscription: isSubscribed ? "pro" : null })
          .eq("id", user.id);
      }
    } catch (e) {
      console.error("Error checking subscription status:", e);
      toast.error("Could not verify subscription status.");
    } finally {
      setIsProcessing(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && Capacitor.isNativePlatform()) {
      checkSubscription();
    }
  }, [user, checkSubscription]);

  return { presentPaywall, isProcessing, checkSubscription, isPro };
}
