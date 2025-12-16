import config from "@/config";
import { Capacitor } from "@capacitor/core";
import { LOG_LEVEL, Purchases } from "@revenuecat/purchases-capacitor";
import { useEffect, useState } from "react";

/**
 * Initialize RevenueCat SDK when device is ready
 * @param userId - User ID for identifying the customer
 */
const onDeviceReady = async (userId) => {
  try {
    if (!userId) throw new Error("User ID is required");

    await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });

    // Configure RevenueCat only for iOS platform
    if (Capacitor.getPlatform() === "ios") {
      await Purchases.configure({
        apiKey: config.revenuecat.apiKey || "",
        appUserID: userId,
      });
    }
  } catch (error) {
    console.error("Failed to initialize RevenueCat:", error);
    return;
  }
};

/**
 * Restore previous purchases for the current user
 * @returns Promise resolving to restored purchase status
 */
const restorePurchases = async () => {
  try {
    const customerInfo = await Purchases.restorePurchases();
    return customerInfo;
  } catch (error) {
    console.error("Error restoring purchases:", error);
    throw error;
  }
};

/**
 * Purchase a subscription or lifetime access
 * @param type - The subscription type: "lifetime", "monthly", or "annually"
 * @returns Promise resolving to purchase result
 */
const purchasePro = async (type) => {
  try {
    const productIdentifier = getProductIdentifier(type);

    // Fetch available products
    const { products } = await Purchases.getProducts({
      productIdentifiers: [productIdentifier],
    });

    if (products.length === 0) {
      throw new Error(`No product found with ID: ${productIdentifier}`);
    }

    // Process purchase
    const purchaseResult = await Purchases.purchaseStoreProduct({
      product: products[0],
    });

    // Check purchase status
    const hasPurchasedProducts =
      purchaseResult.customerInfo.allPurchasedProductIdentifiers.length > 0;

    return {
      success: hasPurchasedProducts,
      customerInfo: purchaseResult.customerInfo,
    };
  } catch (error) {
    console.error("Purchase failed:", error);
    throw error;
  }
};

/**
 * Helper function to get product identifier based on subscription type
 */
const getProductIdentifier = (type) => {
  if (
    !config.revenuecat.lifetimeProductId ||
    !config.revenuecat.monthlyProductId ||
    !config.revenuecat.annuallyProductId
  ) {
    throw new Error("RevenueCat product IDs are not configured");
  }
  switch (type) {
    case "lifetime":
      return config.revenuecat.lifetimeProductId;
    case "monthly":
      return config.revenuecat.monthlyProductId;
    case "annually":
      return config.revenuecat.annuallyProductId;
    default:
      return config.revenuecat.lifetimeProductId;
  }
};

/**
 * Custom hook for managing RevenueCat subscriptions
 * @param userId - User ID for identifying the customer
 * @returns Object containing subscription state and functions
 */
export const useRevenueCat = (userId) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState < any > null;
  const [error, setError] = (useState < Error) | (null > null);
  const [isPro, setIsPro] = useState(false);

  // Initialize RevenueCat when the hook is first used
  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true);
        await onDeviceReady(userId);

        // Get customer info after initialization
        const info = await Purchases.getCustomerInfo();
        setCustomerInfo(info);

        // Check if user has active subscriptions
        const hasActiveSubscription =
          info.customerInfo.entitlements.active &&
          Object.keys(info.customerInfo.entitlements.active).length > 0;
        setIsPro(hasActiveSubscription);

        setIsInitialized(true);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Unknown error during initialization")
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (userId && !isInitialized) {
      initialize();
    }
  }, [userId, isInitialized]);

  // Function to handle purchases
  const purchase = async (type) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await purchasePro(type);
      setCustomerInfo(result.customerInfo);
      setIsPro(result.success);
      return result;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error during purchase")
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to restore purchases
  const restore = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const info = await restorePurchases();

      setCustomerInfo(info);

      // Check if user has active subscriptions after restore
      const hasActiveSubscription =
        info.customerInfo.entitlements.active &&
        Object.keys(info.customerInfo.entitlements.active).length > 0;
      setIsPro(hasActiveSubscription);

      return info;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error during restore")
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isInitialized,
    isLoading,
    customerInfo,
    error,
    isPro,
    purchase,
    restore,
  };
};
