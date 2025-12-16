export const requestWetonAnalysis = async (profileId, birthDate) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.access_token) {
      console.error("Error getting auth token for weton analysis");
      return;
    }

    const response = await fetch(
      "https://weton-ai-next.vercel.app/api/get-fortune",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Error getting weton analysis:", await response.text());
      return;
    }

    const fortuneData = await response.json();

    const supabaseUserClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: { Authorization: `Bearer ${session.access_token}` },
        },
      }
    );

    const readingData = {
      user_id: profileId,
      username: username,
      reading: fortuneData.analysis,
      created_at: new Date().toISOString(),
      reading_type: "free",
      title: "About You",
      reading_category: "general-readings",
      slug: "basic",
    };

    console.log("dapeting analysis", readingData);

    console.log("mulai simpan ke supabase");

    const { data, error: saveError } = await supabaseUserClient
      .from("readings")
      .insert(readingData);

    console.log(data);

    if (saveError) {
      console.error("Error saving reading:", saveError);
      toast.error("Failed to save reading data.");
    } else {
      // Redirect only after successful saving
      router.push("/readings/general-readings/basic");
    }
  } catch (err) {
    console.error("Error in weton analysis process:", err);
    toast.error("Error in weton analysis process.");
  }
};
