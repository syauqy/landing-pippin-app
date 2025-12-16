import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { supabaseAdmin } from "@/utils/supabase/admin";
import {
  dailyReadingPrompt,
  monthlyReadingPrompt,
  primaryTraitsPrompt,
  basicLovePrompt,
  proLovePrompt,
  proGeneralCalculationPrompt,
  proGeneralCalculationPrompt2,
  // proCareerPrompt,
  proCareerProfilePrompt,
  proCareerIdealPrompt,
  // proFinancialPrompt,
  proFinancialFortunePrompt,
  proFinancialConciousPrompt,
  // proLoveCompatibilityPrompt,
  proCoupleCompatibilityPrompt,
  proFriendshipCompatibilityPrompt,
  proLovePrompt2,
} from "@/utils/prompts";
import { z } from "zod";
import {
  // getWeton,
  // getWuku,
  getDayInformation,
  getJavaneseDate,
  checkWeddingFavorability,
  checkDayFavorability,
  checkMonthAuspiciousness,
} from "@/utils";
import { format } from "date-fns";

export async function generateDailyReading(profile, today) {
  // supabase client is now an argument
  // console.log("today date", today);
  // console.log(profile.id, profile.username, today);
  const { data: newReading, error } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "basic",
      reading_category: "daily",
      title: "Daily Reading",
      username: profile.username,
      status: "loading",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error inserting new reading:", error);
    throw error;
  }

  const dayInfo = getDayInformation(format(today, "yyyy-MM-dd"));
  const todayWeton = dayInfo?.todayWeton;
  const todayWuku = dayInfo?.todayWuku;

  // console.log(dayInfo, todayWeton, todayWuku);

  const maxAttempts = 2;
  let attempt = 0;
  let lastErrorMsg = "";
  do {
    attempt++;
    try {
      const response = await generateObject({
        model: google("gemini-2.5-flash-preview-05-20"),
        // model: google("gemini-2.5-pro"),
        // model: google("gemini-2.5-flash-preview-05-20"),
        // model: google("gemini-2.5-flash"),
        providerOptions: {
          google: {
            thinkingConfig: {
              thinkingBudget: 300,
            },
          },
        },
        schema: z.object({
          energy: z.object({
            weton: z.string().describe("Today's Weton"),
            vibe: z.string().describe("Today's vibe in 2-3 words"),
          }),
          focus: z
            .string()
            .describe(
              `In one or two sentences, synthesize today's energy with the user's Weton based on Today's weton, overall day character, day character for wealth/work, and day cautions (only if it's Taliwangke or Samparwangke day).`
            ),
          guidance: z.object({
            do: z.string().describe("One thing to do today"),
            dont: z.string().describe("One thing to avoid today"),
          }),
          wisdom: z.string().describe("Today's Javanese insight"),
          // model: z.string().describe("model used for this object generation"),
        }),
        messages: [
          {
            role: "user",
            content: dailyReadingPrompt(
              profile,
              todayWeton,
              todayWuku,
              dayInfo
            ),
          },
        ],
      });
      const resObj = response.object;

      // console.log("resObj", resObj);

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          subtitle: resObj?.focus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newReading.id);
      break;
    } catch (error) {
      lastErrorMsg = error.message;
      console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
      if (attempt >= maxAttempts) {
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newReading.id);
      }
    }
  } while (attempt < maxAttempts);
}

export async function generateMonthlyReading(profile, today) {
  const { data: newReading, error } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "pro",
      reading_category: "monthly",
      title: "Monthly Reading",
      username: profile.username,
      status: "loading",
      slug: "monthly-reading",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error inserting new reading:", error);
    throw error;
  }

  console.log("new reading generated on supabase", newReading);

  const javaneseDate = getJavaneseDate(format(today, "yyyy-MM-dd"));
  const dayInfo = getDayInformation(format(today, "yyyy-MM-dd"));
  const weddingFavorability = checkWeddingFavorability(
    dayInfo?.todayWeton,
    javaneseDate?.day,
    javaneseDate?.monthName,
    javaneseDate?.yearNumber,
    javaneseDate?.yearName
  );
  const favoriteDayofMonth = checkDayFavorability(
    dayInfo?.todayWeton,
    javaneseDate?.day,
    javaneseDate?.monthName,
    javaneseDate?.yearNumber,
    javaneseDate?.yearName
  );
  const monthAuspiciousness = checkMonthAuspiciousness(javaneseDate?.monthName);

  const maxAttempts = 2;
  let attempt = 0;
  let lastErrorMsg = "";
  do {
    attempt++;
    try {
      const response = await generateObject({
        // model: openai("gpt-4.1-mini-2025-04-14"),
        // model: openai("gpt-4.1-nano-2025-04-14"),
        model: google("gemini-2.5-pro"),
        // model: google("gemini-2.5-flash-preview-05-20"),
        providerOptions: {
          google: {
            thinkingConfig: {
              thinkingBudget: 1000,
            },
          },
        },
        maxTokens: 5000,
        schema: z.object({
          summary: z.object({
            core_theme: z
              .string()
              .describe(
                "What is the dominant theme, based on the month's general favorability and energy, create a core theme."
              )
              .catch(() => ""),
            description: z
              .string()
              .describe(
                "Write a brief, evocative paragraph summarizing the energy of the target month."
              )
              .catch(() => ""),
            auspicious_scale: z
              .string()
              .describe(
                "Calculate a personalized auspiciousness score (1-5) by comparing the month's general favorability with the user's Weton. Return only single number."
              )
              .catch(() => ""),
            auspicious_description: z
              .string()
              .describe(
                `Describe the auspiciousness score creatively (e.g., for 1 is "Requires Patience", for 5 is "Open Doors").`
              )
              .catch(() => ""),
          }),
          analysis: z.object({
            power_days: z
              .string()
              .describe(
                `Clearly list the general favorable days of the week for the month (e.g., "Wednesdays and Thursdays are generally supportive days for you this month."). Then, identify and list 1-2 specific "Personal Power Days" - dates where the daily Weton creates a harmonious combination with the user's own Weton.`
              )
              .catch(() => ""),
            cautious_windows: z
              .string()
              .describe(
                `Clearly list the specific inauspicious dates to be mindful of (e.g., "Be extra mindful on the 11th, 14th, and 27th of the month."). Mention any specific challenging Weton combinations if they occur.`
              )
              .catch(() => ""),
            effect: z
              .string()
              .describe(
                `Write a paragraph explaining the dynamic. For example: "This month's watery, introspective energy harmonizes well with your earthy, patient Weton, creating a wonderful opportunity for deep personal growth."`
              )
              .catch(() => ""),
          }),
          guidance: z.object({
            growth: z
              .string()
              .describe(
                "Opportunities for learning, inner work, breaking habits, or cultivating new virtues."
              )
              .catch(() => ""),
            relationship: z
              .string()
              .describe(
                "Dynamics in romantic partnerships, family interactions, friendships, and social networks. Advice on communication, conflict resolution, or deepening bonds."
              )
              .catch(() => ""),
            career: z
              .string()
              .describe(
                "Professional opportunities, challenges at work, financial trends (saving, spending, investing), and career advancement advice."
              )
              .catch(() => ""),
            health: z
              .string()
              .describe(
                "General energy levels, physical and mental health tendencies, and recommendations for self-care, rest, or specific wellness practices."
              )
              .catch(() => ""),
            spiritual: z
              .string()
              .describe(
                "Insights into spiritual reflection, connection to the divine, or finding inner peace according to Javanese principles."
              )
              .catch(() => ""),
            month_challenge: z
              .string()
              .describe(
                "Create a single, simple, actionable challenge for the user that aligns with the month's core theme."
              )
              .catch(() => ""),
          }),
          wisdom: z.object({
            philosophy: z
              .string()
              .describe(
                "Identify a relevant Javanese philosophical concept (like *keselarasan* (harmony) or *eling lan waspada* (mindfulness & vigilance)). Explain the concept simply and connect it to the month's energy, offering it as a guiding principle for the user."
              )
              .catch(() => ""),
          }),
        }),
        messages: [
          {
            role: "user",
            content: monthlyReadingPrompt(
              profile,
              javaneseDate,
              weddingFavorability,
              favoriteDayofMonth,
              monthAuspiciousness
            ),
          },
        ],
      });
      const resObj = response.object;

      // console.log("resObj", resObj);

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          subtitle: resObj?.summary?.description,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newReading.id);
      break;
    } catch (error) {
      lastErrorMsg = error.message;
      console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
      if (attempt >= maxAttempts) {
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newReading.id);
      }
    }
  } while (attempt < maxAttempts);
}

export async function generatePrimaryTraitsReading(profile) {
  // supabase client is now an argument
  // console.log("Starting AI generation process...");
  // const startTime = process.hrtime.bigint();

  const { data: newReading, error } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "basic",
      reading_category: "general_readings",
      title: "Primary Traits",
      subtitle: "Your most prominent strengths and inherent characteristics",
      username: profile.username,
      status: "loading",
      slug: "primary-traits",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error inserting new reading:", error);
    throw error;
  }

  const maxAttempts = 2;
  let attempt = 0;
  let lastErrorMsg = "";
  do {
    attempt++;
    try {
      const response = await generateObject({
        model: google("gemini-2.5-pro"),
        // model: google("gemini-2.5-flash-preview-05-20"),
        providerOptions: {
          google: {
            thinkingConfig: {
              thinkingBudget: 1000,
            },
          },
        },
        maxTokens: 5000,
        schema: z.object({
          weton_identity: z.object({
            element: z
              .string()
              .describe(
                "Describe the combined elemental and directional symbolism of your dina and pasaran, explaining how this forms your core energetic blueprint."
              )
              .catch(() => ""),
          }),
          characters: z.object({
            laku: z
              .string()
              .describe(
                "Explain the primary Laku associated with this Weton, Neptu, Laku, Rakam and Wuku. Describe what this signifies about their fundamental character and how they navigate life."
              )
              .catch(() => ""),
            strength: z
              .array(
                z
                  .string()
                  .describe(
                    "Detail 3-5 specific positive personality traits and potentials (e.g., leadership, creativity, empathy, resilience, intellect, loyalty) that are characteristic of this Weton. Provide brief explanations of how these might manifest."
                  )
                  .catch(() => "")
              )
              .max(5),
            growth: z
              .array(
                z
                  .string()
                  .describe(
                    "Outline 2-3 potential challenges or inherent tendencies that, if left unmanaged, could lead to difficulties. Frame these constructively as opportunities for self-mastery (e.g., impatience, stubbornness, overly critical nature, mood swings)."
                  )

                  .catch(() => "")
              )
              .max(3),
          }),
          influences: z.object({
            emotion: z
              .string()
              .describe(
                'Describe typical emotional responses and tendencies (e.g., "prone to intense emotions," "generally calm and collected," "empathetic and sensitive").'
              )
              .catch(() => ""),
            social: z
              .string()
              .describe(
                "How do individuals with this Weton typically interact with others? Are they sociable, reserved, diplomatic, or direct? Mention general relationship compatibility principles without detailing specific Weton pairings."
              )
              .catch(() => ""),
            work: z
              .string()
              .describe(
                'What kind of work ethic or professional approach is common? (e.g., "a natural leader," "meticulous and detail-oriented," "prefers independent work").'
              )
              .catch(() => ""),
            financial: z
              .string()
              .describe(
                'General tendencies related to money and resources (e.g., "tends to attract wealth," "needs discipline in spending," "resourceful").'
              )
              .catch(() => ""),
            health: z
              .string()
              .describe(
                "Broad insights into typical energy levels or areas of physical/mental sensitivity, always with a disclaimer to consult medical professionals for health advice."
              )
              .catch(() => ""),
          }),
          symbol: z.object({
            symbol: z
              .string()
              .describe(
                "If there's a traditional animal, plant, or natural phenomenon associated with this Weton (e.g., Manuk Kuntul), briefly explain its symbolic meaning and how it relates to the user's traits."
              )
              .catch(() => ""),
            philosophy: z
              .string()
              .describe(
                "Briefly reference a relevant primbon concept or pepali (Javanese proverb/admonition) that encapsulates a core truth about this Weton's character."
              )
              .catch(() => ""),
          }),
          wisdom: z.object({
            reflection: z
              .string()
              .describe(
                "Offer a prompt for the user to reflect on their inherent traits and how they can consciously work with them."
              )
              .catch(() => ""),
            empowerment: z
              .string()
              .describe(
                "A concluding statement encouraging the user to embrace their unique Weton characteristics for personal growth and fulfillment."
              )
              .catch(() => ""),
          }),
        }),
        messages: [{ role: "user", content: primaryTraitsPrompt(profile) }],
      });
      const resObj = response.object;

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newReading.id);

      // const endTime = process.hrtime.bigint();
      // const durationMs = Number(endTime - startTime) / 1_000_000;
      // console.log(`Total AI Generation Logic took: ${durationMs}ms`);
      break;
    } catch (error) {
      lastErrorMsg = error.message;
      console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
      if (attempt >= maxAttempts) {
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newReading.id);
      }
    }
  } while (attempt < maxAttempts);
}

export async function generateGeneralProReading(profile) {
  const { data: newRakamReading, error } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "pro",
      reading_category: "general_readings",
      title: "Rakam",
      subtitle:
        "Uncover the significant life themes or karmic imprints shaping your experiences",
      username: profile.username,
      status: "loading",
      slug: "rakam",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error inserting new reading:", error);
    throw error;
  }

  console.log("new reading generated on supabase", newRakamReading);

  const { data: newSaptawaraReading, errorSaptawara } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "pro",
      reading_category: "general_readings",
      title: "Pancasuda",
      subtitle:
        "Reveal the core pillar of your inner foundation and its potential influenced by the seven-day Pawukon cycle",
      username: profile.username,
      status: "loading",
      slug: "pancasuda",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (errorSaptawara) {
    console.error("Error inserting new reading:", errorSaptawara);
    throw error;
  }

  console.log("new reading generated on supabase", newSaptawaraReading);

  const { data: newLakuReading, errorLaku } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "pro",
      reading_category: "general_readings",
      title: "Laku",
      subtitle:
        "Discover the archetype and behavioral pattern that guides your life's journey.",
      username: profile.username,
      status: "loading",
      slug: "laku",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (errorLaku) {
    console.error("Error inserting new reading:", errorLaku);
    throw errorLaku;
  }

  console.log("new reading generated on supabase", newLakuReading);

  const maxAttempts = 2;
  let attempt = 0;
  let lastErrorMsg = "";
  do {
    attempt++;
    try {
      const response = await generateObject({
        // model: google("gemini-2.5-flash"),
        // model: openai("o4-mini-2025-04-16"),
        model: google("gemini-2.5-pro"),
        providerOptions: {
          google: {
            thinkingConfig: {
              thinkingBudget: 1000,
            },
          },
        },
        maxTokens: 10000,
        schema: z.object({
          rakam: z.object({
            story: z
              .string()
              .describe(
                "Briefly explain the core meaning and symbolism of their Rakam."
              ),
            theme: z
              .string()
              .describe(
                "Describe how this narrative influences their character, their reactions, and their view of the world."
              ),
            plot: z
              .string()
              .describe(
                "Explain how this theme affects their social standing and the flow of fortune in their life."
              ),
            moral: z
              .string()
              .describe(
                `Offer clear guidance. "As 'The Challenger of Fate,' your path requires you to consciously choose courage over fear. Your greatest rewards lie on the other side of the challenges you are destined to face.`
              ),
          }),
          saptawara: z.object({
            character: z
              .string()
              .describe(
                'Detail the fundamental temperament and key symbolic associations (e.g., "Bumi Kapetak" or "Cultivated Earth")'
              ),
            innate_gift: z
              .string()
              .describe(
                "Describe the strengths and positive opportunities this trait brings into their life."
              ),
            shadow: z
              .string()
              .describe(
                `Gently explain the potential challenges or misuse of this gift. Ask a reflective question: "As someone with the generosity of *Wasesa Segara*, how can you give freely while also honoring your own needs?"`
              ),
            gift_to_work: z
              .string()
              .describe(
                "Provide clear, actionable advice on how to lean into the positive side of this trait to build a better life."
              ),
          }),
          laku: z.object({
            core_meaning: z
              .string()
              .describe(
                "Explain the metaphorical meaning of this specific Laku and its core characteristics. Describe the core characteristics."
              ),
            strengths: z
              .string()
              .describe(
                "Detail the natural positive qualities that stem from this Laku (e.g., resilience, deep thought, independence, charisma, adaptability, diligence)."
              ),
            challenges: z
              .string()
              .describe(
                "Explain their instinctual approach to overcoming challenges, using the metaphor of their element."
              ),
            influence: z
              .string()
              .describe(
                "How does this Laku shape your general approach to daily life, decision-making, and facing adversity?"
              ),
            ritual: z
              .string()
              .describe(
                "Suggest a simple, tangible activity they can do to reconnect with their core Laku energy when they feel out of balance."
              ),
          }),
        }),
        messages: [
          { role: "user", content: proGeneralCalculationPrompt(profile) },
        ],
      });
      const resObj = response.object;

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj.rakam,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newRakamReading.id);

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj.saptawara,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newSaptawaraReading.id);

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj.laku,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newLakuReading.id);

      break;
    } catch (error) {
      lastErrorMsg = error.message;
      console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
      if (attempt >= maxAttempts) {
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newRakamReading.id);
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newSaptawaraReading.id);
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newLakuReading.id);
      }
    }
  } while (attempt < maxAttempts);
}

export async function generateGeneralProReading2(profile) {
  const { data: newValuesReading, errorValues } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "pro",
      reading_category: "general_readings",
      title: "Values",
      subtitle:
        "Pinpoint the core principles that drive your decisions and motivations.",
      username: profile.username,
      status: "loading",
      slug: "values",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (errorValues) {
    console.error("Error inserting new reading:", errorValues);
    throw error;
  }

  console.log("new reading generated on supabase", newValuesReading);

  const { data: newInteractionStyle, errorInteraction } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "pro",
      reading_category: "general_readings",
      title: "Interaction Style",
      subtitle:
        "Learn how you naturally connect and communicate with the world around you.",
      username: profile.username,
      status: "loading",
      slug: "interaction-style",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (errorInteraction) {
    console.error("Error inserting new reading:", errorInteraction);
    throw error;
  }

  console.log("new reading generated on supabase", newInteractionStyle);

  const maxAttempts = 2;
  let attempt = 0;
  let lastErrorMsg = "";
  do {
    attempt++;
    try {
      const response = await generateObject({
        // model: google("gemini-2.5-flash-preview-05-20"),
        // model: openai("o4-mini-2025-04-16"),
        model: google("gemini-2.5-pro"),
        providerOptions: {
          google: {
            thinkingConfig: {
              thinkingBudget: 1000,
            },
          },
        },
        maxTokens: 5000,
        schema: z.object({
          values: z.object({
            primary_value: z
              .string()
              .describe(
                "Identify and describe the dominant 2-3 core values that are most pronounced in your Weton combination (e.g., harmony (keselarasan), responsibility (tanggung jawab), sincerity (ikhlas), humility (andhap asor), collective well-being (memayu hayuning bawana), honesty (kejujuran), perseverance (tekun), wisdom (kawicaksanan))."
              ),
            manifest: z
              .string()
              .describe(
                "Explain how these values are likely to manifest in your daily behavior, relationships, and professional life. Provide concrete examples."
              ),
            motivation: z
              .string()
              .describe(
                "What truly drives your actions and aspirations, according to your Weton influences?"
              ),
            conflicts: z
              .string()
              .describe(
                "Briefly touch upon any inherent tensions between different values or how external pressures might challenge your core principles, and how your Weton suggests navigating these."
              ),
            philosophy: z
              .string()
              .describe(
                "Connect your core values to broader Javanese philosophical concepts or ethical guidelines, explaining their significance in a traditional context."
              ),
          }),
          interaction_style: z.object({
            social_tendency: z
              .string()
              .describe(
                "Are you naturally more introverted or extroverted? Direct or indirect in communication? Preferring harmony over confrontation, or vice-versa? Describe your overarching social tendency."
              ),
            communication: z
              .string()
              .describe(
                "Detail your typical communication style (e.g., articulate, reserved, expressive, pragmatic, empathetic, logical). How do you tend to convey your thoughts and feelings?"
              ),
            relationship: z
              .string()
              .describe(
                "How do you typically initiate, maintain, and navigate friendships, professional connections, and community ties? Are you a leader, a supportive follower, a mediator, or an independent contributor?"
              ),
            social_dynamics: z
              .string()
              .describe(
                "How do you typically react to social challenges, group pressures, or differing opinions?"
              ),
            social_etiquette: z
              .string()
              .describe(
                "Connect aspects of your interaction style to relevant Javanese tata krama (etiquette) or social norms, explaining how your Weton might naturally align with or challenge these traditions."
              ),
          }),
        }),
        messages: [
          { role: "user", content: proGeneralCalculationPrompt2(profile) },
        ],
      });
      const resObj = response.object;

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj.interaction_style,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newInteractionStyle.id);

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj.values,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newValuesReading.id);

      break;
    } catch (error) {
      lastErrorMsg = error.message;
      console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
      if (attempt >= maxAttempts) {
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newValuesReading.id);
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newInteractionStyle.id);
        // await supabase
        //   .from("readings")
        //   .update({
        //     status: "error",
        //     reading: { error: lastErrorMsg },
        //     updated_at: new Date().toISOString(),
        //   })
        //   .eq("id", newLifePathReading.id);
      }
    }
  } while (attempt < maxAttempts);
}

export async function generateLoveBasicReading(profile) {
  const { data: newLoveBasicReading, error } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "basic",
      reading_category: "love_readings",
      title: "Your Love",
      subtitle:
        "Explore the core of how your Weton shapes your approach to love and partnership",
      username: profile.username,
      status: "loading",
      slug: "love-core",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error inserting new reading:", error);
    throw error;
  }

  console.log("new reading generated on supabase", newLoveBasicReading);

  const { data: newLoveStyleReading, errorLoveStyle } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "basic",
      reading_category: "love_readings",
      title: "Love Style",
      subtitle:
        "Discover your natural way of expressing and receiving affection in relationships.",
      username: profile.username,
      status: "loading",
      slug: "love-style",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (errorLoveStyle) {
    console.error("Error inserting new reading:", error);
    throw error;
  }

  console.log("new reading generated on supabase", newLoveStyleReading);

  const { data: newLoveAttitudesReading, errorLoveAttitudes } =
    await supabaseAdmin
      .from("readings")
      .insert({
        reading_type: "basic",
        reading_category: "love_readings",
        title: "Love Attitudes",
        subtitle:
          "Uncover your underlying beliefs and perspectives when it comes to romance.",
        username: profile.username,
        status: "loading",
        slug: "love-attitudes",
        user_id: profile.id,
      })
      .select()
      .maybeSingle();

  if (errorLoveAttitudes) {
    console.error("Error inserting new reading:", error);
    throw error;
  }

  console.log("new reading generated on supabase", newLoveAttitudesReading);

  const maxAttempts = 2;
  let attempt = 0;
  let lastErrorMsg = "";
  do {
    attempt++;
    try {
      const response = await generateObject({
        model: google("gemini-2.5-pro"),
        // model: google("gemini-2.5-flash-preview-05-20"),
        providerOptions: {
          google: {
            thinkingConfig: {
              thinkingBudget: 1000,
            },
          },
        },
        maxTokens: 5000,
        schema: z.object({
          love_core: z.object({
            romantic_archetype: z
              .string()
              .describe(
                'Based on the interplay of your core birth elements, describe your fundamental "essence" or "archetype" in love. Are you inherently a nurturing partner, an adventurous companion, a stable anchor, a passionate lover, a spiritual seeker in relationships, or something else?'
              )
              .catch(() => ""),
            emotional_foundation: z
              .string()
              .describe(
                "How do your birth Weton and Wuku influence your emotional needs within a relationship? What kind of emotional environment do you naturally seek or create?"
              )
              .catch(() => ""),
            interpersonal_instincts: z
              .string()
              .describe(
                'How do your Rakam shape your innate social grace and the way you navigate the "give and take" of a partnership? Do you prioritize harmony, intellectual connection, shared values, or mutual growth?'
              )
              .catch(() => ""),
            underlying_drives: z
              .string()
              .describe(
                "What are the deep-seated, perhaps unconscious, drives or patterns (influenced by your Saptawara and Laku) that shape your interactions and expectations in love? (e.g., a drive for security, freedom, passion, understanding, or a desire to serve)."
              )
              .catch(() => ""),
            philosophy: z
              .string()
              .describe(
                "Connect your core approach to love with a relevant Javanese philosophical concept (e.g., keselarasan (harmony), golong gilig (unity of purpose), memayu hayuning bawana (preserving the beauty of the world, often through relational balance))."
              )
              .catch(() => ""),
          }),
          love_style: z.object({
            primary_expression: z
              .string()
              .describe(
                "How do you naturally show love and care to a partner? (e.g., through acts of service (pengabdian), gentle words (ucapan lembut), thoughtful gestures (perhatian), creating shared experiences (kebersamaan), or practical support (bantuan nyata))."
              )
              .catch(() => ""),
            desired_affection: z
              .string()
              .describe(
                "How do you primarily wish to receive love from a partner? What makes you feel most cherished and secure in a relationship?"
              )
              .catch(() => ""),
            romantic_ideal: z
              .string()
              .describe(
                "What kind of romantic experience or partner do you inherently yearn for or seek out? Is it a profound spiritual connection, an exciting adventure, a deeply stable home life, or a dynamic intellectual exchange?"
              )
              .catch(() => ""),
            demonstration_of_passion: z
              .string()
              .describe(
                "How does your Weton influence the way you express passion or romantic intensity? Are you overtly passionate, subtly devoted, or express love through unwavering loyalty?"
              )
              .catch(() => ""),
            cultural_nuance: z
              .string()
              .describe(
                "Briefly touch upon any specific Javanese cultural expectations or interpretations of love expression that might resonate with your Weton (e.g., tata krama in affection, the importance of sabar and ikhlas in love)."
              )
              .catch(() => ""),
          }),
          love_attitudes: z.object({
            commitment: z
              .string()
              .describe(
                "What is your intrinsic perspective on commitment and long-term relationships? Do you see them as a sacred bond, a practical partnership, a journey of shared growth, or something that requires careful negotiation of freedom?"
              )
              .catch(() => ""),
            conflict: z
              .string()
              .describe(
                "How do you typically tend to handle disagreements or challenges in a relationship? (e.g., by seeking harmony and compromise, through direct and frank communication, by needing space, or by seeking understanding first)."
              )
              .catch(() => ""),
            trust: z
              .string()
              .describe(
                "What are your inherent tendencies and values regarding trust, loyalty, and fidelity within a partnership? What builds trust for you, and what erodes it?"
              )
              .catch(() => ""),
            interdependence: z
              .string()
              .describe(
                "How do you naturally balance your personal autonomy and need for individual space with the desire for relational closeness and shared life? Do you lean towards being more independent, highly interdependent, or is it a constant dance?"
              )
              .catch(() => ""),
            harmony: z
              .string()
              .describe(
                "Emphasize how the concept of keselarasan (harmony) might manifest in your attitudes towards resolving differences and maintaining peace in a relationship, given your Weton influences."
              )
              .catch(() => ""),
          }),
        }),
        messages: [{ role: "user", content: basicLovePrompt(profile) }],
      });
      const resObj = response.object;

      // console.log("resObj", resObj);

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj.love_core,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newLoveBasicReading.id);

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj.love_style,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newLoveStyleReading.id);

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj.love_attitudes,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newLoveAttitudesReading.id);
      break;
    } catch (error) {
      lastErrorMsg = error.message;
      console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
      if (attempt >= maxAttempts) {
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newLoveBasicReading.id);
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newLoveStyleReading.id);
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newLoveAttitudesReading.id);
      }
    }
  } while (attempt < maxAttempts);
}

export async function generateLoveProReading(profile) {
  const { data: newLoveOfferReading, errorOffer } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "pro",
      reading_category: "love_readings",
      title: "What You Can Offer",
      subtitle:
        "Identify the unique strengths and gifts you bring to a loving relationship",
      username: profile.username,
      status: "loading",
      slug: "your-offer",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (errorOffer) {
    console.error("Error inserting new reading:", errorOffer);
    throw error;
  }

  console.log("new reading generated on supabase", newLoveOfferReading);

  const { data: newLoveCompatibleReading, errorCompatible } =
    await supabaseAdmin
      .from("readings")
      .insert({
        reading_type: "pro",
        reading_category: "love_readings",
        title: "Compatible With",
        subtitle:
          "Learn about Weton energies that naturally harmonize with your own in love",
        username: profile.username,
        status: "loading",
        slug: "love-compatibility",
        user_id: profile.id,
      })
      .select()
      .maybeSingle();

  if (errorCompatible) {
    console.error("Error inserting new reading:", errorCompatible);
    throw error;
  }

  console.log("new reading generated on supabase", newLoveCompatibleReading);

  const maxAttempts = 2;
  let attempt = 0;
  let lastErrorMsg = "";
  do {
    attempt++;
    try {
      const response = await generateObject({
        // model: google("gemini-2.5-flash-preview-05-20"),
        model: google("gemini-2.5-pro", {
          fetchOptions: {
            timeout: 120000,
          },
        }),
        // model: openai("o3"),
        providerOptions: {
          google: {
            thinkingConfig: {
              thinkingBudget: 1000,
            },
          },
        },
        maxRetries: 2,
        retryDelay: 1000,
        maxTokens: 10000,
        schema: z.object({
          your_offer: z.object({
            key_positive: z
              .string()
              .describe(
                "Based on their Weton and Rakam, identify and describe 2-3 of their most powerful, positive qualities as a partner."
              ),
            impact: z
              .string()
              .describe(
                "Describe the overall feeling or energy they bring to a relationship, linking it to their Laku."
              ),
            tendency: z
              .string()
              .describe(
                "Explain their primary method of nurturing a partner, drawing from the nuances of their Weton."
              ),
            approach: z
              .string()
              .describe(
                "Describe their key strength in navigating relationship challenges, positioning them as a capable and valuable teammate."
              ),
            responsibility: z
              .string()
              .describe(
                "Conclude by explaining the concept of responsibility as the honor of holding space for a partner, linking this to their innate character."
              ),
          }),
          compatible: z.object({
            harmony: z
              .string()
              .describe(
                "Describe the general types of Weton energies (e.g., those with a complementary Laku, or a similar Neptu energy) that align well with the user's."
              ),
            values: z
              .string()
              .describe(
                "Identify broader Weton categories or qualities that suggest a shared outlook on life, similar core values, or a comparable approach to relationships, which foster compatibility."
              ),
            growth: z
              .string()
              .describe(
                "Mention Weton types that, while not necessarily 'easy,' offer opportunities for significant mutual growth and balance through complementary energies."
              ),
            dynamic: z
              .string()
              .describe(
                'Briefly explain why these compatibilities exist (e.g., "They offer stability to your adventurous spirit," "Their calm nature balances your fiery passion," "You both value spiritual growth").'
              ),
            soulmate: z
              .string()
              .describe(
                "Conclude by explaining the Javanese concept of soulmate as an energetically destined match that often feels like coming home."
              ),
          }),
        }),
        messages: [{ role: "user", content: proLovePrompt(profile) }],
      });
      const resObj = response.object;

      // console.log("resObj", resObj);

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj.your_offer,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newLoveOfferReading.id);

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj.compatible,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newLoveCompatibleReading.id);
      break;
    } catch (error) {
      lastErrorMsg = error.message;
      console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
      if (attempt >= maxAttempts) {
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newLoveOfferReading.id);
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newLoveCompatibleReading.id);
      }
    }
  } while (attempt < maxAttempts);
}

export async function generateLoveProReading2(profile) {
  const { data: newLoveAttachmentReading, error } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "pro",
      reading_category: "love_readings",
      title: "Attachment Style",
      subtitle:
        "Gain insight into how you form bonds and connect emotionally with partners",
      username: profile.username,
      status: "loading",
      slug: "attachment-style",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error inserting new reading:", error);
    throw error;
  }

  console.log("new reading generated on supabase", newLoveAttachmentReading);

  const { data: newLoveIncompatibleReading, errorIncompatible } =
    await supabaseAdmin
      .from("readings")
      .insert({
        reading_type: "pro",
        reading_category: "love_readings",
        title: "Incompatible With",
        subtitle:
          "Understand potential energetic clashes and challenges with other Wetons in relationships",
        username: profile.username,
        status: "loading",
        slug: "love-incompatibility",
        user_id: profile.id,
      })
      .select()
      .maybeSingle();

  if (errorIncompatible) {
    console.error("Error inserting new reading:", errorIncompatible);
    throw error;
  }

  console.log("new reading generated on supabase", newLoveIncompatibleReading);

  const maxAttempts = 2;
  let attempt = 0;
  let lastErrorMsg = "";
  do {
    attempt++;
    try {
      const response = await generateObject({
        model: google("gemini-2.5-pro"),
        // model: openai("o4-mini-2025-04-16"),
        // model: openai("o3"),
        providerOptions: {
          google: {
            thinkingConfig: {
              thinkingBudget: 1000,
            },
          },
        },
        maxTokens: 10000,
        schema: z.object({
          attachment_style: z.object({
            core_bonding: z
              .string()
              .describe(
                'Based on their Weton and Laku, assign them a relatable attachment archetype (e.g., "The Steady Anchor," "The Eager Wave"). Describe this core tendency.'
              ),
            comfort: z
              .string()
              .describe(
                "How does your Weton influence your comfort levels with deep intimacy, emotional sharing, and vulnerability in a relationship? Are you naturally open, cautious, or do you prefer a more guarded approach?"
              ),
            space: z
              .string()
              .describe(
                "Based on their Weton and Rakam, describe their likely emotional reaction to distance in a relationship."
              ),
            dependency: z
              .string()
              .describe(
                "Discuss their natural inclination towards independence or interdependence. Frame this as a unique balance, not a flaw. Describe your natural leanings regarding dependency within a partnership?"
              ),
            jodoh: z
              .string()
              .describe(
                "Explaining Javanese concept of jodoh and describe how their specific attachment style can contribute to creating a relationship that feels mutual."
              ),
          }),
          incompatible: z.object({
            clashes: z
              .string()
              .describe(
                `Gently identify the types of Weton energies that may present challenges for the user, and explain *why* (e.g., "Your fiery, direct nature may clash with a Weton that is highly sensitive and indirect.").`
              ),
            differences: z
              .string()
              .describe(
                "Identify broader Weton categories or qualities that suggest a likelihood of conflicting values, vastly different life approaches, or opposing communication styles, which could lead to misunderstandings."
              ),
            guidance: z
              .string()
              .describe(
                'Provide concrete, actionable advice. "When this disagreement arises, your best strategy is to pause before speaking and consciously soften your approach. Ask questions instead of making statements."'
              ),
            mindfulness: z
              .string()
              .describe(
                `Conclude by explaining this Javanese principle of "Mindfulness and Vigilance." Emphasize that this is the master key to making any relationship thrive, especially one with built-in growth opportunities.`
              ),
            challenges: z
              .string()
              .describe(
                'Frames the difficulties not as failures, but as powerful opportunities for personal development. (like "This clash teaches you the art of patience. Their sensitivity teaches you the power of gentle words.").'
              ),
          }),
        }),
        messages: [{ role: "user", content: proLovePrompt2(profile) }],
      });
      const resObj = response.object;

      // console.log("resObj", resObj);

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj.attachment_style,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newLoveAttachmentReading.id);

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj.incompatible,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newLoveIncompatibleReading.id);

      break;
    } catch (error) {
      lastErrorMsg = error.message;
      console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
      if (attempt >= maxAttempts) {
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newLoveAttachmentReading.id);
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newLoveIncompatibleReading.id);
      }
    }
  } while (attempt < maxAttempts);
}

// export async function generateCareerProReading(profile) {
//   const { data: newCareerReading, error } = await supabaseAdmin
//     .from("readings")
//     .insert({
//       reading_type: "pro",
//       reading_category: "work_readings",
//       title: "Your Career",
//       subtitle:
//         "Explore professions and work styles that resonate with your Weton's energy.",
//       username: profile.username,
//       status: "loading",
//       slug: "your-career",
//       user_id: profile.id,
//     })
//     .select()
//     .maybeSingle();

//   if (error) {
//     console.error("Error inserting new reading:", error);
//     throw error;
//   }

//   console.log("new reading generated on supabase", newCareerReading);

//   const { data: newIdealLifeReading, errorIdealLife } = await supabaseAdmin
//     .from("readings")
//     .insert({
//       reading_type: "pro",
//       reading_category: "work_readings",
//       title: "Ideal Life",
//       subtitle:
//         "Envision the life that truly fulfills your potential and deepest aspirations.",
//       username: profile.username,
//       status: "loading",
//       slug: "ideal-life",
//       user_id: profile.id,
//     })
//     .select()
//     .maybeSingle();

//   if (errorIdealLife) {
//     console.error("Error inserting new reading:", errorIdealLife);
//     throw error;
//   }

//   console.log("new reading generated on supabase", newIdealLifeReading);

//   // const { data: newKeyLifeReading, errorKeyLife } = await supabase
//   //   .from("readings")
//   //   .insert({
//   //     reading_type: "pro",
//   //     reading_category: "work_readings",
//   //     title: "Key Life Themes",
//   //     subtitle:
//   //       "Identify potential pivotal moments and themes that may shape your journey.",
//   //     username: profile.username,
//   //     status: "loading",
//   //     slug: "key-life",
//   //     user_id: profile.id,
//   //   })
//   //   .select()
//   //   .maybeSingle();

//   // if (errorKeyLife) {
//   //   console.error("Error inserting new reading:", errorKeyLife);
//   //   throw error;
//   // }

//   // console.log("new reading generated on supabase", newKeyLifeReading);

//   const maxAttempts = 2;
//   let attempt = 0;
//   let lastErrorMsg = "";
//   do {
//     attempt++;
//     try {
//       const response = await generateObject({
//         // model: google("gemini-2.5-flash-preview-05-20"),
//         model: google("gemini-2.5-pro"),
//         providerOptions: {
//           google: {
//             thinkingConfig: {
//               thinkingBudget: 2000,
//             },
//           },
//         },
//         schema: z.object({
//           career: z.object({
//             strengths: z
//               .string()
//               .describe(
//                 "Begin by identifying and naming their single greatest professional strength based on their core Weton character. Provide examples of how these might manifest."
//               )
//               .catch(() => ""),
//             ideal_work: z
//               .string()
//               .describe(
//                 "Analyze their Laku. Describe the types of professional settings or industries where your Weton suggests you would feel most aligned and productive. Describe the type of work environment (e.g., fast-paced startup, stable corporate, independent freelance) where they will feel effective."
//               )
//               .catch(() => ""),
//             leadership: z
//               .string()
//               .describe(
//                 "Based on their Weton, assign them a clear collaborative archetype (e.g., Leader, Mentor, Innovator, Anchor) and explain how this shows up in team projects."
//               )
//               .catch(() => ""),
//             challenges: z
//               .string()
//               .describe(
//                 `Analyze their Rakam or the challenging aspects of their Weton. Identify their key professional challenge and frame it as their "growth edge"—the one area where intentional effort will bring the most reward. Offer guidance on how to navigate these.`
//               )
//               .catch(() => ""),
//             // makarya: z
//             //   .string()
//             //   .describe(
//             //     "Explain the Javanese concept of *makarya* (working with diligence and purpose). Connect this to their path to success, emphasizing that their greatest rewards will come from applying their professional with integrity and effort."
//             //   )
//             //   .catch(() => ""),
//           }),
//           ideal_life: z.object({
//             fulfillment: z
//               .string()
//               .describe(
//                 "Analyze their Weton and Wuku to describe what a fulfilling life looks like for them, moving beyond material wealth. Describe what constitutes your unique vision of a fulfilling life."
//               )
//               .catch(() => ""),
//             peace: z
//               .string()
//               .describe(
//                 "Briefly define this Javanese concept of deep inner peace. Then, based on their Weton's core energy, offer personalized advice on how they can cultivate this state."
//               )
//               .catch(() => ""),
//             priorities: z
//               .string()
//               .describe(
//                 `What are the fundamental areas of life (e.g., family, self-development, community, spiritual practice, work, leisure) that your Weton suggests should be prioritized for your overall well-being and sense of meaning?`
//               )
//               .catch(() => ""),
//             authentic: z
//               .string()
//               .describe(
//                 "Provide simple, practical, daily advice for how to live in harmony with their elemental nature (*Laku*)."
//               )
//               .catch(() => ""),
//             environment: z
//               .string()
//               .describe(
//                 "Describe the types of physical places and social dynamics where their soul will feel most at home and able to grow."
//               )
//               .catch(() => ""),
//           }),
//           // key_life: z.object({
//           //   trajectory: z
//           //     .string()
//           //     .describe(
//           //       "Describe the general 'flavor' or dominant journey theme of your life path (e.g., a journey of continuous learning, consistent growth, navigating frequent changes, finding stability, or experiencing profound transformations)."
//           //     )
//           //     .catch(() => ""),
//           //   cycles: z
//           //     .string()
//           //     .describe(
//           //       "Explain that their life has natural cycles of action and reflection, using the Pasaran cycle as a simple model. Based on the interplay of your Weton and Wuku cycles, suggest periods that might naturally be more conducive to active pursuit (growth) versus those better suited for reflection and consolidation (rest)."
//           //     )
//           //     .catch(() => ""),
//           //   lessons: z
//           //     .string()
//           //     .describe(
//           //       `Clearly state the primary lesson their soul is here to learn, framing it as the central theme of their "character arc. Discuss the potential lessons or transformations that often accompany these key life themes, highlighting how they contribute to your overall development.`
//           //     )
//           //     .catch(() => ""),
//           //   destiny: z
//           //     .string()
//           //     .describe(
//           //       "This is the most important section. Explain this core Javanese philosophy using a clear metaphor (like a map vs. the walker). Emphasize that while their life has energetic themes, their choices and efforts (*usaha*) are what create the actual story."
//           //     )
//           //     .catch(() => ""),
//           //   transitions: z
//           //     .string()
//           //     .describe(
//           //       "Offer brief, wise advice for how their specific character can best navigate moments of major life change."
//           //     )
//           //     .catch(() => ""),
//           // }),
//         }),
//         messages: [{ role: "user", content: proCareerPrompt(profile) }],
//       });
//       const resObj = response.object;

//       await supabaseAdmin
//         .from("readings")
//         .update({
//           status: "completed",
//           reading: resObj.career,
//           input_token: response.usage.promptTokens,
//           output_token: response.usage.completionTokens,
//           total_token: response.usage.totalTokens,
//           updated_at: new Date().toISOString(),
//         })
//         .eq("id", newCareerReading.id);

//       await supabaseAdmin
//         .from("readings")
//         .update({
//           status: "completed",
//           reading: resObj.ideal_life,
//           input_token: response.usage.promptTokens,
//           output_token: response.usage.completionTokens,
//           total_token: response.usage.totalTokens,
//           updated_at: new Date().toISOString(),
//         })
//         .eq("id", newIdealLifeReading.id);

//       // await supabase
//       //   .from("readings")
//       //   .update({
//       //     status: "completed",
//       //     reading: resObj.key_life,
//       //     input_token: response.usage.promptTokens,
//       //     output_token: response.usage.completionTokens,
//       //     total_token: response.usage.totalTokens,
//       //     updated_at: new Date().toISOString(),
//       //   })
//       //   .eq("id", newKeyLifeReading.id);
//     } catch (error) {
//       lastErrorMsg = error.message;
//       console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
//       if (attempt >= maxAttempts) {
//         await supabaseAdmin
//           .from("readings")
//           .update({
//             status: "error",
//             reading: { error: lastErrorMsg },
//             updated_at: new Date().toISOString(),
//           })
//           .eq("id", newCareerReading.id);
//         await supabaseAdmin
//           .from("readings")
//           .update({
//             status: "error",
//             reading: { error: lastErrorMsg },
//             updated_at: new Date().toISOString(),
//           })
//           .eq("id", newIdealLifeReading.id);
//       }
//     }
//   } while (attempt < maxAttempts);
// }

export async function generateCareerProfileReading(profile) {
  const { data: newCareerReading, error } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "pro",
      reading_category: "work_readings",
      title: "Your Career",
      subtitle:
        "Explore professions and work styles that resonate with your Weton's energy.",
      username: profile.username,
      status: "loading",
      slug: "your-career",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error inserting new reading:", error);
    throw error;
  }

  console.log("new reading generated on supabase", newCareerReading);

  const maxAttempts = 2;
  let attempt = 0;
  let lastErrorMsg = "";
  do {
    attempt++;
    try {
      const response = await generateObject({
        model: google("gemini-2.5-pro"),
        providerOptions: {
          google: {
            thinkingConfig: {
              thinkingBudget: 1000,
            },
          },
        },
        maxTokens: 5000,
        schema: z.object({
          career: z.object({
            strengths: z
              .string()
              .describe(
                "Begin by identifying and naming their single greatest professional strength based on their core Weton character. Provide examples of how these might manifest."
              )
              .catch(() => ""),
            ideal_work: z
              .string()
              .describe(
                "Analyze their Laku. Describe the types of professional settings or industries where your Weton suggests you would feel most aligned and productive. Describe the type of work environment (e.g., fast-paced startup, stable corporate, independent freelance) where they will feel effective."
              )
              .catch(() => ""),
            leadership: z
              .string()
              .describe(
                "Based on their Weton, assign them a clear collaborative archetype (e.g., Leader, Mentor, Innovator, Anchor) and explain how this shows up in team projects."
              )
              .catch(() => ""),
            challenges: z
              .string()
              .describe(
                `Analyze their Rakam or the challenging aspects of their Weton. Identify their key professional challenge and frame it as their "growth edge"—the one area where intentional effort will bring the most reward. Offer guidance on how to navigate these.`
              )
              .catch(() => ""),
          }),
        }),
        messages: [{ role: "user", content: proCareerProfilePrompt(profile) }],
      });
      const resObj = response.object;

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj.career,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newCareerReading.id);
    } catch (error) {
      lastErrorMsg = error.message;
      console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
      if (attempt >= maxAttempts) {
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newCareerReading.id);
      }
    }
  } while (attempt < maxAttempts);
}

export async function generateCareerIdealReading(profile) {
  const { data: newIdealLifeReading, errorIdealLife } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "pro",
      reading_category: "work_readings",
      title: "Ideal Life",
      subtitle:
        "Envision the life that truly fulfills your potential and deepest aspirations.",
      username: profile.username,
      status: "loading",
      slug: "ideal-life",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (errorIdealLife) {
    console.error("Error inserting new reading:", errorIdealLife);
    throw error;
  }

  console.log("new reading generated on supabase", newIdealLifeReading);

  const maxAttempts = 2;
  let attempt = 0;
  let lastErrorMsg = "";
  do {
    attempt++;
    try {
      const response = await generateObject({
        model: google("gemini-2.5-pro"),
        providerOptions: {
          google: {
            thinkingConfig: {
              thinkingBudget: 1000,
            },
          },
        },
        maxTokens: 5000,
        schema: z.object({
          ideal_life: z.object({
            fulfillment: z
              .string()
              .describe(
                "Analyze their Weton and Wuku to describe what a fulfilling life looks like for them, moving beyond material wealth."
              )
              .catch(() => ""),
            peace: z
              .string()
              .describe(
                "Briefly define the Javanese concept of ayem tentrem or inner peace. Then, based on their Weton's core energy, offer personalized advice on how they can cultivate this state."
              )
              .catch(() => ""),
            priorities: z
              .string()
              .describe(
                `List 2 areas of life (e.g., family, self-development, community, work, leisure) that your Weton suggests should be prioritized for your overall well-being.`
              )
              .catch(() => ""),
            laku: z
              .string()
              .describe(
                "Provide simple, practical, daily advice for how to live in harmony based on their Laku."
              )
              .catch(() => ""),
            environments: z
              .string()
              .describe(
                "Describe the types of physical places and social dynamics where their soul will feel most at home and able to grow."
              )
              .catch(() => ""),
          }),
        }),
        messages: [{ role: "user", content: proCareerIdealPrompt(profile) }],
      });
      const resObj = response.object;

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj.ideal_life,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newIdealLifeReading.id);
    } catch (error) {
      lastErrorMsg = error.message;
      console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
      if (attempt >= maxAttempts) {
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newIdealLifeReading.id);
      }
    }
  } while (attempt < maxAttempts);
}

// export async function generateFinancialProReadingCopy(profile) {
//   const { data: newFinancialReading, error } = await supabaseAdmin
//     .from("readings")
//     .insert({
//       reading_type: "pro",
//       reading_category: "financial_readings",
//       title: "Your Financial",
//       subtitle:
//         "Understand your natural approach to wealth, and financial opportunities.",
//       username: profile.username,
//       status: "loading",
//       slug: "your-financial",
//       user_id: profile.id,
//     })
//     .select()
//     .maybeSingle();

//   if (error) {
//     console.error("Error inserting new reading:", error);
//     throw error;
//   }

//   console.log("new reading generated on supabase", newFinancialReading);

//   const { data: newConciousCoinReading, errorConciousCoin } =
//     await supabaseAdmin
//       .from("readings")
//       .insert({
//         reading_type: "pro",
//         reading_category: "financial_readings",
//         title: "Concious Coin",
//         subtitle:
//           "Understand your spending style that reflects your values and priorities.",
//         username: profile.username,
//         status: "loading",
//         slug: "concious-coin",
//         user_id: profile.id,
//       })
//       .select()
//       .maybeSingle();

//   if (errorConciousCoin) {
//     console.error("Error inserting new reading:", errorConciousCoin);
//     throw error;
//   }

//   console.log("new reading generated on supabase", newConciousCoinReading);

//   const { data: newWealthPurposeReading, errorWealthPurpose } =
//     await supabaseAdmin
//       .from("readings")
//       .insert({
//         reading_type: "pro",
//         reading_category: "financial_readings",
//         title: "Wealth Through Purpose",
//         subtitle:
//           "Explores how your Weton impacting financial prosperity and personal fulfillment.",
//         username: profile.username,
//         status: "loading",
//         slug: "wealth-purpose",
//         user_id: profile.id,
//       })
//       .select()
//       .maybeSingle();

//   if (errorWealthPurpose) {
//     console.error("Error inserting new reading:", errorWealthPurpose);
//     throw error;
//   }

//   console.log("new reading generated on supabase", newWealthPurposeReading);

//   const maxAttempts = 2;
//   let attempt = 0;
//   let lastErrorMsg = "";
//   do {
//     attempt++;
//     try {
//       const response = await generateObject({
//         // model: google("gemini-2.5-flash-preview-05-20"),
//         model: google("gemini-2.5-pro"),
//         providerOptions: {
//           google: {
//             thinkingConfig: {
//               thinkingBudget: 2000,
//             },
//           },
//         },
//         schema: z.object({
//           financial: z.object({
//             archetype: z
//               .string()
//               .describe(
//                 `Based on a holistic view of their profile, assign them a resonant archetype title. (e.g., "The Diligent Builder," "The Charismatic Merchant," "The Community Steward," "The Intuitive Risk-Taker", and so on)`
//               )
//               .catch(() => ""),
//             mindset: z
//               .string()
//               .describe(
//                 "Describe your natural approach to earning, saving, and spending. Are you typically a natural accumulator, a generous giver, a careful planner, or someone who tends to take more risks?"
//               )
//               .catch(() => ""),
//             tendencies: z
//               .string()
//               .describe(
//                 "Discuss your overall predisposition towards attracting or managing financial resources. This isn't about specific amounts, but about the flow of wealth in your life. explain their natural comfort level with financial risk."
//               )
//               .catch(() => ""),
//             opportunities: z
//               .string()
//               .describe(
//                 "Identify the general avenues or approaches through which you are most likely to find financial opportunities (e.g., through diligent work, networking, specific talents, or by helping others)."
//               )
//               .catch(() => ""),
//             pitfalls: z
//               .string()
//               .describe(
//                 "Outline any inherent tendencies that might lead to financial challenges or require careful management (e.g., impulsive spending, excessive generosity, aversion to financial planning, periods of unexpected fluctuation)."
//               )
//               .catch(() => ""),
//             karmic: z
//               .string()
//               .describe(
//                 "Analyze their Pancasuda and Rakam. Clearly explain their innate financial advantage (e.g., *Satria Wibawa* - commanding respect that brings opportunity) or the primary financial challenge they are here to master. Frame the challenge as a vital area for personal growth."
//               )
//               .catch(() => ""),
//           }),
//           // cycles: z.object({
//           //   cycles: z
//           //     .string()
//           //     .describe(
//           //       "Describe the broader periods of financial growth, stability, or potential challenge that may recur in your life, based on your inherent Wuku and Weton influences."
//           //     )
//           //     .catch(() => ""),
//           //   auspicious: z
//           //     .string()
//           //     .describe(
//           //       "Highlight general types of times or phases that are traditionally considered more favorable for specific financial endeavors (e.g., starting new businesses, making significant investments, major purchases, signing contracts). Explain the energetic reason behind these recommendations."
//           //     )
//           //     .catch(() => ""),
//           //   caution: z
//           //     .string()
//           //     .describe(
//           //       "Identify types of times or phases that may require greater caution or conservative financial strategies (e.g., avoiding large risks, reviewing budgets, delaying major expenditures)."
//           //     )
//           //     .catch(() => ""),
//           //   auspicious_alignment: z
//           //     .string()
//           //     .describe(
//           //       "Offer actionable advice on how to tune into and leverage these cyclical insights, emphasizing the wisdom of choosing dina apik for important financial undertakings, without guaranteeing outcomes."
//           //     )
//           //     .catch(() => ""),
//           // }),
//           purpose: z.object({
//             talents: z
//               .string()
//               .describe(
//                 "Identify your key innate talents, skills, and areas of intelligence (derived from your Weton and Laku) that are most conducive to creating wealth through meaningful work."
//               )
//               .catch(() => ""),
//             values: z
//               .string()
//               .describe(
//                 "Discuss how your core values (from your Weton and Rakam) should guide your financial endeavors. What kind of earning methods would resonate most deeply with your integrity and sense of purpose?"
//               )
//               .catch(() => ""),
//             contribution: z
//               .string()
//               .describe(
//                 "Explain how contributing your unique gifts to society or solving problems for others can naturally unlock financial opportunities and spiritual fulfillment."
//               )
//               .catch(() => ""),
//             nurturing: z
//               .string()
//               .describe(
//                 'Offer advice on how to cultivate a personal "ecosystem" where your work, values, and financial aspirations are harmoniously intertwined, leading to sustainable prosperity.'
//               )
//               .catch(() => ""),
//             proverb: z
//               .string()
//               .describe(
//                 "Conclude with a fitting Javanese proverb that serves as a mantra for their journey to purposeful wealth."
//               )
//               .catch(() => ""),
//           }),
//           concious: z.object({
//             introduction: z
//               .string()
//               .describe(
//                 `Start with a simple, profound idea: every financial transaction is an exchange of energy. Ask the user, "Is the energy you send out into the world through your money aligned with the person you truly are?"`
//               )
//               .catch(() => ""),
//             values: z
//               .string()
//               .describe(
//                 `Identify the user's Wuku Guardian Deity (*Dewa*). Describe the primary virtues of that deity (e.g., justice, creativity, compassion, wisdom). Present these as the user's "Soul's Core Values."`
//               )
//               .catch(() => ""),
//             budget: z
//               .string()
//               .describe(
//                 `Guide them to think about their spending through the lens of these values. Ask reflective questions like: "Your patron is Batara Wisnu, a symbol of universal compassion. When you look at your monthly spending, how much of it is dedicated to caring for others or for the world? This isn't a judgment, but an observation."`
//               )
//               .catch(() => ""),
//             mindful: z
//               .string()
//               .describe(
//                 `Based on their core values, provide gentle guidance on how they can express their nature through generosity. "For you, true generosity may not be about money, but about sharing your gift of wisdom or your time for a just cause."`
//               )
//               .catch(() => ""),
//             philosophy: z
//               .string()
//               .describe(
//                 `Introduce the Javanese concept of *Memayu Hayuning Bawana* (a commitment to beautifying the beauty of the world). Frame it as a timeless guide for ethical and conscious use of resources.`
//               )
//               .catch(() => ""),
//           }),
//         }),
//         messages: [{ role: "user", content: proFinancialPrompt(profile) }],
//       });
//       const resObj = response.object;

//       await supabaseAdmin
//         .from("readings")
//         .update({
//           status: "completed",
//           reading: resObj.financial,
//           input_token: response.usage.promptTokens,
//           output_token: response.usage.completionTokens,
//           total_token: response.usage.totalTokens,
//           updated_at: new Date().toISOString(),
//         })
//         .eq("id", newFinancialReading.id);

//       await supabaseAdmin
//         .from("readings")
//         .update({
//           status: "completed",
//           reading: resObj.concious,
//           input_token: response.usage.promptTokens,
//           output_token: response.usage.completionTokens,
//           total_token: response.usage.totalTokens,
//           updated_at: new Date().toISOString(),
//         })
//         .eq("id", newConciousCoinReading.id);

//       await supabaseAdmin
//         .from("readings")
//         .update({
//           status: "completed",
//           reading: resObj.purpose,
//           input_token: response.usage.promptTokens,
//           output_token: response.usage.completionTokens,
//           total_token: response.usage.totalTokens,
//           updated_at: new Date().toISOString(),
//         })
//         .eq("id", newWealthPurposeReading.id);
//     } catch (error) {
//       lastErrorMsg = error.message;
//       console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
//       if (attempt >= maxAttempts) {
//         await supabaseAdmin
//           .from("readings")
//           .update({
//             status: "error",
//             reading: { error: lastErrorMsg },
//             updated_at: new Date().toISOString(),
//           })
//           .eq("id", newFinancialReading.id);
//       }
//     }
//   } while (attempt < maxAttempts);
// }

export async function generateFinancialFortuneReading(profile) {
  const { data: newReading, error } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "pro",
      reading_category: "financial_readings",
      title: "Your Financial",
      subtitle:
        "Understand your natural approach to wealth, and financial opportunities.",
      username: profile.username,
      status: "loading",
      slug: "your-financial",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error inserting new reading:", error);
    throw error;
  }

  const maxAttempts = 2;
  let attempt = 0;
  let lastErrorMsg = "";
  do {
    attempt++;
    try {
      const response = await generateObject({
        model: google("gemini-2.5-pro"),
        providerOptions: {
          google: {
            thinkingConfig: {
              thinkingBudget: 1000,
            },
          },
        },
        maxTokens: 5000,
        schema: z.object({
          archetype: z
            .string()
            .describe(
              `Based on a holistic view of their profile, assign them a resonant archetype title. (e.g., "The Diligent Builder," "The Charismatic Merchant," "The Community Steward," "The Intuitive Risk-Taker", and so on)`
            )
            .catch(() => ""),
          mindset: z
            .string()
            .describe(
              "Describe your natural approach to earning, saving, and spending. Are you typically a natural accumulator, a generous giver, a careful planner, or someone who tends to take more risks?"
            )
            .catch(() => ""),
          tendencies: z
            .string()
            .describe(
              "Discuss your overall predisposition towards attracting or managing financial resources. This isn't about specific amounts, but about the flow of wealth in your life. explain their natural comfort level with financial risk."
            )
            .catch(() => ""),
          opportunities: z
            .string()
            .describe(
              "Identify the general avenues or approaches through which you are most likely to find financial opportunities (e.g., through diligent work, networking, specific talents, or by helping others)."
            )
            .catch(() => ""),
          pitfalls: z
            .string()
            .describe(
              "Outline any inherent tendencies that might lead to financial challenges or require careful management (e.g., impulsive spending, excessive generosity, aversion to financial planning, periods of unexpected fluctuation)."
            )
            .catch(() => ""),
          karmic: z
            .string()
            .describe(
              "Analyze their Pancasuda and Rakam. Clearly explain their innate financial advantage (e.g., *Satria Wibawa* - commanding respect that brings opportunity) or the primary financial challenge they are here to master. Frame the challenge as a vital area for personal growth."
            )
            .catch(() => ""),
        }),
        messages: [
          { role: "user", content: proFinancialFortunePrompt(profile) },
        ],
      });
      const resObj = response.object;

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newReading.id);
      break;
    } catch (error) {
      lastErrorMsg = error.message;
      console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
      if (attempt >= maxAttempts) {
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newReading.id);
      }
    }
  } while (attempt < maxAttempts);
}

export async function generateConsciousCoinReading(profile) {
  const { data: newReading, error } = await supabaseAdmin
    .from("readings")
    .insert({
      reading_type: "pro",
      reading_category: "financial_readings",
      title: "Conscious Coin",
      subtitle:
        "Understand your spending style that reflects your values and priorities.",
      username: profile.username,
      status: "loading",
      slug: "concious-coin",
      user_id: profile.id,
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error inserting new reading:", error);
    throw error;
  }

  const maxAttempts = 2;
  let attempt = 0;
  let lastErrorMsg = "";
  do {
    attempt++;
    try {
      const response = await generateObject({
        model: google("gemini-2.5-pro"),
        providerOptions: {
          google: {
            thinkingConfig: {
              thinkingBudget: 1000,
            },
          },
        },
        maxTokens: 5000,
        schema: z.object({
          introduction: z
            .string()
            .describe(
              `Start with a simple, profound idea: every financial transaction is an exchange of energy. Ask the user, "Is the energy you send out into the world through your money aligned with the person you truly are?"`
            )
            .catch(() => ""),
          values: z
            .string()
            .describe(
              `Identify the user's Wuku Guardian Deity (*Dewa*). Describe the primary virtues of that deity (e.g., justice, creativity, compassion, wisdom). Present these as the user's "Soul's Core Values."`
            )
            .catch(() => ""),
          budget: z
            .string()
            .describe(
              `Guide them to think about their spending through the lens of these values. Ask reflective questions like: "Your patron is Batara Wisnu, a symbol of universal compassion. When you look at your monthly spending, how much of it is dedicated to caring for others or for the world? This isn't a judgment, but an observation."`
            )
            .catch(() => ""),
          mindful: z
            .string()
            .describe(
              `Based on their core values, provide gentle guidance on how they can express their nature through generosity. "For you, true generosity may not be about money, but about sharing your gift of wisdom or your time for a just cause."`
            )
            .catch(() => ""),
          philosophy: z
            .string()
            .describe(
              `Introduce the Javanese concept of *Memayu Hayuning Bawana* (a commitment to beautifying the beauty of the world). Frame it as a timeless guide for ethical and conscious use of resources.`
            )
            .catch(() => ""),
        }),
        messages: [
          { role: "user", content: proFinancialConciousPrompt(profile) },
        ],
      });
      const resObj = response.object;

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newReading.id);
      break;
    } catch (error) {
      lastErrorMsg = error.message;
      console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
      if (attempt >= maxAttempts) {
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", newReading.id);
      }
    }
  } while (attempt < maxAttempts);
}

export async function generateCoupleCompatibilityReading(
  profile1,
  profile2,
  wetonJodoh,
  readingId
) {
  console.log("updating reading on supabase", readingId);

  const maxAttempts = 2;
  let attempt = 0;
  let lastErrorMsg = "";
  do {
    attempt++;
    try {
      const response = await generateObject({
        // model: google("gemini-2.5-flash-preview-05-20"),
        model: google("gemini-2.5-pro"),
        providerOptions: {
          google: {
            thinkingConfig: {
              thinkingBudget: 2000,
            },
          },
        },
        maxTokens: 5000,
        schema: z.object({
          header: z
            .string()
            .describe(
              "Write a single, powerful sentence summarizing the core of their connection., its greatest gift, and its central lesson."
            )
            .catch(() => ""),
          score: z
            .number()
            .describe("Overall Compatibility Score: A score of 0 to 100")
            .catch(() => ""),
          insight: z
            .string()
            .describe(
              "Write a warm, 2-3 sentence paragraph explaining the relationship's greatest gift and its central lesson."
            )
            .catch(() => ""),
          summary: z.object({
            archetype: z
              .string()
              .describe(
                `Based on their combined energies, create and assign a unique archetype name (e.g., "The Power Creators," "The Nurturing Haven").`
              )
              .catch(() => ""),
            strengths: z
              .string()
              .describe(
                "List and describe the top 2-3 areas of natural harmony and strength in their relationship based on each individual characters"
              )
              .catch(() => ""),
            challenges: z
              .string()
              .describe(
                "List and describe the 1-2 key areas that will require the most conscious effort and communication based on each individual characters"
              )
              .catch(() => ""),
            essence: z
              .string()
              .describe(
                'A metaphorical description of their combined energy (e.g., "Like two rivers flowing into a mighty current", "Like two strong trees growing towards the sun").'
              )
              .catch(() => ""),
          }),
          deep_dive: z.object({
            journey: z.object({
              result: z
                .string()
                .describe(`State the calculated result, e.g., "Padu"`)
                .catch(() => ""),
              interpretation: z
                .string()
                .describe(
                  `Provide a detailed explanation of what this specific result signifies for the couple's relationship (e.g., for "Padu," discuss frequent arguments but also potential for growth through conflict, and how to navigate it).`
                )
                .catch(() => ""),
            }),
            fortune: z.object({
              result: z
                .string()
                .describe(`State the calculated result, e.g., "Lungguh"`)
                .catch(() => ""),
              interpretation: z
                .string()
                .describe(
                  `Detail what this result means for their shared financial path and overall prosperity (e.g., for "Lungguh," that implies possessing a position of honor or authority. discuss material comfort and sufficiency).`
                )
                .catch(() => ""),
            }),
            character: z.object({
              result: z
                .string()
                .describe(`State the calculated result, e.g., "Sumur Sinaba"`)
                .catch(() => ""),
              interpretation: z
                .string()
                .describe(
                  `Explain the implications for their emotional connection, wisdom, and how they mutually support each other's inner lives (e.g., for "Sumur Sinaba," indicate a relationship where others seek their advice, signifying wisdom).`
                )
                .catch(() => ""),
            }),
            destiny: z.object({
              result: z
                .string()
                .describe(`State the calculated result, e.g., "Jodoh"`)
                .catch(() => ""),
              interpretation: z
                .string()
                .describe(
                  `Provide a comprehensive explanation of what this result suggests about their fated connection, major life events they might face together, and how they are destined to interact (e.g., for "Jodoh," indicate a deeply harmonious and fated connection).`
                )
                .catch(() => ""),
            }),
          }),
          blend: z.object({
            neptu: z.object({
              result: z
                .string()
                .describe(
                  `State the calculated result in english, e.g., "1 & 2"`
                )
                .catch(() => ""),
              interpretation: z
                .string()
                .describe(
                  `Explain the general meaning of this neptu based on ${wetonJodoh.jodoh9.result} in terms of the couple's overall energetic signature, shared destiny, and collective temperament.`
                )
                .catch(() => ""),
            }),
            dina: z.object({
              result: z
                .string()
                .describe(
                  `State the calculated result in english, e.g., "Monday & Monday"`
                )
                .catch(() => ""),
              interpretation: z
                .string()
                .describe(
                  `Explain the general meaning of this dina combination based on ${wetonJodoh.jodohDay.result}`
                )
                .catch(() => ""),
              weton_essence: z
                .string()
                .describe(
                  `Briefly describe the core energetic characteristics of each partner's individual Weton (e.g., "Kamis Legi brings a thoughtful, influential energy..." and "Sabtu Pon brings a determined, somewhat reserved energy...").`
                )
                .catch(() => ""),
              vibe: z
                .string()
                .describe(
                  `Describe the nature of their daily interactions based on their combined days of the week. Use a simple metaphor (e.g., "Like a steady hand guiding a creative kite.").`
                )
                .catch(() => ""),
            }),
          }),
          dynamics: z.object({
            harmony: z
              .string()
              .describe(
                `Identify 2-3 key aspects where your combined Weton energies create effortless understanding, support, or shared joy (e.g., shared values, complementary work ethics, similar emotional needs, balanced elemental forces leading to stability or passion).`
              )
              .catch(() => ""),
            mutual_growth: z
              .string()
              .describe(
                `What unique qualities does each partner's Weton bring to the relationship that enriches the other, fosters mutual growth, or strengthens the partnership as a whole?`
              )
              .catch(() => ""),
            synergy: z
              .string()
              .describe(
                `Where do your combined Weton energies create a powerful synergy that allows you to achieve more together than individually?`
              )
              .catch(() => ""),
          }),
          challenges: z.object({
            friction: z
              .string()
              .describe(
                `Identify 2-3 key areas where your Weton components might naturally clash, creating misunderstandings, disagreements, or differing needs (e.g., conflicting communication styles, contrasting approaches to finances, differing desires for independence vs. closeness, emotional reactions).`
              )
              .catch(() => ""),
            root_cause: z
              .string()
              .describe(
                `Briefly explain why these clashes might occur, linking them directly to specific Weton characteristics or traditional interpretations (e.g., "Partner A's 'Lakune Geni' might clash with Partner B's 'Lakune Banyu' in emotionally charged situations, requiring mindful emotional regulation").`
              )
              .catch(() => ""),
            strategies: z
              .string()
              .describe(
                `Offer concrete, actionable advice rooted in Javanese wisdom for navigating these challenges (e.g., fostering patience (sabar), practicing sincerity (ikhlas), engaging in open dialogue (musyawarah), cultivating empathy (tepa slira), or understanding each other's watak (character) and sifat (traits)).`
              )
              .catch(() => ""),
          }),
          wisdom: z.object({
            relationship_journey: z
              .string()
              .describe(
                `Briefly summarize the core nature of your union, integrating the various insights from the reading.`
              )
              .catch(() => ""),
          }),
        }),
        messages: [
          {
            role: "user",
            content: proCoupleCompatibilityPrompt(
              profile1,
              profile2,
              wetonJodoh
            ),
          },
        ],
      });
      const resObj = response.object;

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          subtitle: resObj?.header,
          updated_at: new Date().toISOString(),
        })
        .eq("id", readingId);
    } catch (error) {
      console.log(error);
      lastErrorMsg = error.message;
      console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
      if (attempt >= maxAttempts) {
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", readingId);
      }
    }
  } while (attempt < maxAttempts);
}

export async function generateFriendshipCompatibilityReading(
  profile1,
  profile2,
  wetonJodoh,
  readingId
) {
  console.log("new reading generated on supabase", readingId);

  const maxAttempts = 2;
  let attempt = 0;
  let lastErrorMsg = "";
  do {
    attempt++;
    try {
      const response = await generateObject({
        // model: google("gemini-2.5-flash-preview-05-20"),
        model: google("gemini-2.5-pro"),
        providerOptions: {
          google: {
            thinkingConfig: {
              thinkingBudget: 2000,
            },
          },
        },
        maxTokens: 5000,
        schema: z.object({
          header: z
            .string()
            .describe(
              "Write a single, powerful sentence summarizing the core of their connection., its greatest gift, and its central lesson."
            )
            .catch(() => ""),
          score: z
            .number()
            .describe("Overall Compatibility Score: A score of 0 to 100")
            .catch(() => ""),
          insight: z
            .string()
            .describe(
              "Write a warm, 2-3 sentence paragraph explaining the friendship's greatest gift and its central lesson."
            )
            .catch(() => ""),
          summary: z.object({
            archetype: z
              .string()
              .describe(
                `Create and assign a unique, modern archetype for their friendship. (e.g., "The Creative Collaborators").`
              )
              .catch(() => ""),
            vibe: z
              .string()
              .describe(
                `Write a single, insightful sentence describing the energetic feel of their connection.`
              )
              .catch(() => ""),
            strengths: z
              .string()
              .describe(
                "List and describe 3-4 powerful things that define their bond based on each individual characters (weton, rakam, laku, wuku)."
              )
              .catch(() => ""),
            challenges: z
              .string()
              .describe(
                "List and describe the 1-2 key areas that will require the most conscious effort and communication based on each individual characters (weton, rakam, laku, wuku)."
              )
              .catch(() => ""),
            anthem: z
              .string()
              .describe(
                "Suggest the *type* of song that represents their friendship's energy that is globally popular and related with modern generation (Millenials and Gen-Z). And describe why it relevan to their friendship."
              )
              .catch(() => ""),
          }),
          friendship: z.object({
            power_level: z.object({
              result: z
                .string()
                .describe(
                  `State the calculated result of each individual total neptu, e.g., "12 and 18"`
                )
                .catch(() => ""),
              interpretation: z
                .string()
                .describe(
                  `Explain what their each individual neptu character value signifies about their friendship's intensity and nature.`
                )
                .catch(() => ""),
            }),
            fortune: z.object({
              result: z
                .string()
                .describe(`State the calculated result, e.g., "Gembili"`)
                .catch(() => ""),
              interpretation: z
                .string()
                .describe(
                  `State their result of ${wetonJodoh.jodoh4.name} and interpret its meaning as the core narrative of their friendship. (e.g., for "Lungguh," that implies possessing a position of honor or authority. discuss material comfort and sufficiency).`
                )
                .catch(() => ""),
            }),
            character: z.object({
              result: z
                .string()
                .describe(`State the calculated result, e.g., "Tunggak Semi"`)
                .catch(() => ""),
              interpretation: z
                .string()
                .describe(
                  `State their result of ${wetonJodoh.jodoh7.name} and explain how the world likely perceives them as a duo and what they contribute to their wider social circle. (e.g., for "Sumur Sinaba," indicate a relationship where others seek their advice, signifying wisdom).`
                )
                .catch(() => ""),
            }),
          }),
          playbook: z.object({
            support: z
              .string()
              .describe(
                `Describe their complementary emotional support roles based on their individual Weton strengths.`
              )
              .catch(() => ""),
            work: z
              .string()
              .describe(
                `Based on their Laku and Weton, analyze their dynamic in a professional setting. Who is the leader? Who is the creative? How do they best work on a project together?`
              )
              .catch(() => ""),
            money: z
              .string()
              .describe(
                `Based on their individual Weton archetypes, describe their financial habits. Offer gentle advice on navigating situations like splitting bills or lending money between them.`
              )
              .catch(() => ""),
            wingman: z
              .string()
              .describe(
                `Describe how they likely support each other in their romantic lives, drawing from the core themes of their individual Wuku.`
              )
              .catch(() => ""),
            travel: z
              .string()
              .describe(
                `Analyze their compatibility as travel partners based on their Weton's need for structure versus spontaneity. Suggest their ideal type of vacation.`
              )
              .catch(() => ""),
          }),
          challenges: z.object({
            friction: z
              .string()
              .describe(
                `Identify 2-3 key areas where your Weton components might naturally clash, creating misunderstandings, disagreements, or differing needs (e.g., conflicting communication styles, contrasting approaches to finances, differing desires for independence vs. closeness, emotional reactions).`
              )
              .catch(() => ""),
            root_cause: z
              .string()
              .describe(
                `Briefly explain why these clashes might occur, linking them directly to specific Weton characteristics or traditional interpretations (e.g., "Partner A's 'Lakune Geni' might clash with Partner B's 'Lakune Banyu' in emotionally charged situations, requiring mindful emotional regulation").`
              )
              .catch(() => ""),
            strategies: z
              .string()
              .describe(
                `Offer concrete, actionable advice rooted in Javanese wisdom for navigating these challenges (e.g., fostering patience (sabar), practicing sincerity (ikhlas), engaging in open dialogue (musyawarah), cultivating empathy (tepa slira), or understanding each other's watak (character) and sifat (traits)).`
              )
              .catch(() => ""),
          }),
        }),
        messages: [
          {
            role: "user",
            content: proFriendshipCompatibilityPrompt(
              profile1,
              profile2,
              wetonJodoh
            ),
          },
        ],
      });
      const resObj = response.object;

      await supabaseAdmin
        .from("readings")
        .update({
          status: "completed",
          reading: resObj,
          input_token: response.usage.promptTokens,
          output_token: response.usage.completionTokens,
          total_token: response.usage.totalTokens,
          subtitle: resObj?.header,
          updated_at: new Date().toISOString(),
        })
        .eq("id", readingId);
    } catch (error) {
      console.log(error);
      lastErrorMsg = error.message;
      console.error(`Attempt ${attempt} failed:`, lastErrorMsg);
      if (attempt >= maxAttempts) {
        await supabaseAdmin
          .from("readings")
          .update({
            status: "error",
            reading: { error: lastErrorMsg },
            updated_at: new Date().toISOString(),
          })
          .eq("id", readingId);
      }
    }
  } while (attempt < maxAttempts);
}
