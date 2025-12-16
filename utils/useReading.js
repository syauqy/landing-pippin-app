import { useEffect } from "react";
import useSWR from "swr";
import { supabase } from "./supabaseClient";

// The key for SWR to cache and identify this data
const SWR_KEY = "readings";

const fetcherDaily = async ([_key, userId]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (!userId) return null;

  const { data, error } = await supabase
    .from("readings")
    .select("id, reading, created_at, status")
    .eq("user_id", userId)
    .gte("created_at", today.toISOString())
    .lt("created_at", tomorrow.toISOString())
    .eq("reading_category", "daily")
    .order("created_at", { ascending: false })
    .maybeSingle();

  if (error) {
    console.error("Error fetching daily reading data:", error);
    throw error;
  }
  return data;
};

export const useDailyReading = (userId) => {
  const SWR_KEY_DAILY = userId ? ["daily-reading", userId] : null;
  const { data, error, mutate } = useSWR(SWR_KEY_DAILY, fetcherDaily);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`db-readings-user-eq-${userId}-daily`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "readings",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const record = payload.new || payload.old;
          if (record && record.reading_category === "daily") {
            console.log("Daily reading change received, revalidating.");
            mutate();
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, mutate]);

  return {
    reading: data,
    isLoading: !error && data === undefined,
    error: error,
  };
};

const fetcherCompatibility = async (key) => {
  const slug = key.split("/").pop();

  if (!slug) return null;

  const { data, error } = await supabase
    .from("readings")
    .select("id, status, reading, title, subtitle, reading_category, slug")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching reading data:", error);
    throw error;
  }
  return data;
};

export const useCompatibilityReading = (slug) => {
  const { data, error, mutate } = useSWR(slug, fetcherCompatibility);
  useEffect(() => {
    const handleDatabaseChange = (payload) => {
      console.log("Database change received!", payload);
      mutate(payload.new);
    };

    const subscription = supabase
      .channel(`db-readings-slug-eq-${slug}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "readings",
          filter: `slug=eq.${slug}`,
        },
        handleDatabaseChange
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [slug, mutate]);

  return {
    reading: data,
    isLoading: !error && data === undefined,
    error: error,
  };
};

const fetcherMonthly = async ([_key, userId]) => {
  if (!userId) return null;

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const firstDayOfNextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1
  );

  const { data, error } = await supabase
    .from("readings")
    .select("id, reading, created_at, status, reading_category, slug")
    .eq("user_id", userId)
    .eq("reading_category", "monthly")
    .gte("created_at", firstDayOfMonth.toISOString())
    .lt("created_at", firstDayOfNextMonth.toISOString())
    .order("created_at", { ascending: false })
    .maybeSingle();

  if (error) {
    console.error("Error fetching monthly reading data:", error);
    throw error;
  }

  return data;
};

export const useMonthlyReading = (userId) => {
  const SWR_KEY_MONTHLY = userId ? ["monthly-reading", userId] : null;
  const { data, error, mutate } = useSWR(SWR_KEY_MONTHLY, fetcherMonthly);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`db-readings-user-eq-${userId}-monthly`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "readings",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const record = payload.new || payload.old;
          if (record && record.reading_category === "monthly") {
            console.log("Monthly reading change received, revalidating.");
            mutate();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, mutate]);

  return {
    reading: data,
    isLoading: !error && data === undefined,
    error: error,
  };
};

const fetcherReading = async ([
  _key,
  userId,
  readingCategory,
  slug,
  readingType,
]) => {
  if (!userId || !readingCategory || !slug || !readingType) return null;

  const { data, error } = await supabase
    .from("readings")
    .select(
      "id, reading, created_at, status, reading_category, slug, title, subtitle"
    )
    .eq("user_id", userId)
    .eq("reading_category", readingCategory)
    .eq("slug", slug)
    .eq("reading_type", readingType)
    .maybeSingle();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // No reading found, not an error
    }
    console.error("Error fetching reading data:", error);
    throw error;
  }

  return data;
};

export const useReading = (userId, readingCategory, slug, readingType) => {
  const SWR_KEY =
    userId && readingCategory && slug && readingType
      ? ["reading", userId, readingCategory, slug, readingType]
      : null;
  const { data, error, mutate } = useSWR(SWR_KEY, fetcherReading);

  useEffect(() => {
    if (!userId || !slug || !readingCategory) return;

    const channel = supabase
      .channel(
        `db-readings-user-eq-${userId}-cat-eq-${readingCategory}-slug-eq-${slug}`
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "readings" },
        (payload) => {
          const record = payload.new || payload.old;
          if (
            record &&
            record.slug === slug &&
            record.reading_category === readingCategory
          ) {
            // console.log(
            //   `Reading change for slug ${slug} in category ${readingCategory} received, revalidating.`
            // );
            mutate();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, slug, readingCategory, mutate]);

  return {
    reading: data,
    isLoading: !error && data === undefined,
    error: error,
    mutate: mutate,
  };
};
