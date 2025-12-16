import { neptuSaptawara, nameSaptawara } from "@/lib/saptawara";
import { namePancasuda } from "@/lib/pancasuda";
import { nameLaku } from "@/lib/laku";
import { nameRakam } from "@/lib/rakam";
import { nameWuku } from "@/lib/wuku";
import {
  neptuDina,
  neptuPasaran,
  watakHari,
  watakPasaran,
  watakTotalNeptu,
  watakWeton,
} from "@/lib/weton";
import { nameHastawara } from "@/lib/hastawara";
import { nameSadwara } from "@/lib/sadwara";
import {
  nameDivison4,
  nameDivison5,
  nameDivison7,
  nameDivison8,
  neptuCombination,
  dinaCombination,
} from "@/lib/jodoh";
import {
  javaneseMonths,
  javaneseYears,
  leapYearDays,
  normalYearDays,
} from "@/lib/javanese-calendar";
import { dayCharacters, taliwangkeDays, samparwangkeDays } from "@/lib/daily";
import {
  weddingFavorableMonths,
  favorableDaysofMonths,
  inauspiciousDatesinMonth,
} from "@/lib/monthly";

export function getJavaneseDate(inputDate) {
  let date;
  if (typeof inputDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(inputDate)) {
    date = new Date(`${inputDate}T12:00:00Z`);
  } else if (inputDate instanceof Date) {
    date = inputDate;
  } else {
    throw new Error("Invalid date format for getJavaneseDate");
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const gregorianDate = {
    date: date.getUTCDate(),
    month: monthNames[date.getUTCMonth()],
    year: date.getUTCFullYear(),
  };

  const epoch = new Date(1936, 2, 24).getTime();
  let unix = new Date(date);
  let dateConv = unix.getTime();

  let Rentang = Math.floor((dateConv - epoch) / 1000 / 3600 / 24);

  const JAVANESE_EPOCH_YEAR_1936 = 1867;

  const yearLengths = [354, 355, 354, 354, 355, 354, 354, 355];

  let A = Rentang % 2835;
  let monthIndex = 0;
  let yearIndex = 0;
  let x = A - yearLengths[yearIndex] + 1;

  while (x > 0) {
    yearIndex += 1;
    x -= yearLengths[yearIndex];
  }

  let D = x + yearLengths[yearIndex] - 30;
  let dayInMonth = D + 30;

  if (yearLengths[yearIndex] == 355) {
    while (D > 0) {
      dayInMonth = D;
      monthIndex += 1;
      D -= leapYearDays[monthIndex];
    }
  }

  if (yearLengths[yearIndex] == 354) {
    while (D > 0) {
      dayInMonth = D;
      monthIndex += 1;
      D -= normalYearDays[monthIndex];
    }
  }

  // const warsa = windu * 8 * JAVANESE_EPOCH_YEAR_1936 + I;

  // Calculate Javanese year number
  const javaneseYearNumber =
    JAVANESE_EPOCH_YEAR_1936 + Math.floor(Rentang / 2835) * 8 + yearIndex;
  const windu = Math.floor((Rentang % 11340) / 2835);

  return {
    windu: windu,
    day: dayInMonth,
    gregorianDate: {
      fullDate: `${gregorianDate.date} ${gregorianDate.month} ${gregorianDate.year}`,
      date: gregorianDate.date,
      month: gregorianDate.month,
      year: gregorianDate.year,
    },
    date: `${dayInMonth} ${javaneseMonths[monthIndex]} ${javaneseYearNumber} (${javaneseYears[yearIndex]})`,
    monthName: javaneseMonths[monthIndex],
    yearName: javaneseYears[yearIndex],
    yearNumber: javaneseYearNumber,
  };
}

export function checkWeddingFavorability(
  javaneseDayName,
  javaneseDate,
  javaneseMonth,
  javaneseYear,
  javaneseYearName
) {
  const yearData = weddingFavorableMonths?.find(
    (y) => y.year === javaneseYearName
  );

  if (!yearData) {
    return {
      status: "unknown",
      message: `Could not find data for Javanese year ${javaneseYearName}`,
    };
  }

  // Check if the month is favorable
  const isFavorable = yearData.favorableMonths.includes(javaneseMonth);

  // Check if the month is unfavorable
  const isUnfavorable = yearData.unfavorableMonths.includes(javaneseMonth);

  let status, message;

  if (isFavorable) {
    status = "favorable";
    message = `${javaneseMonth} is a favorable month for weddings and big events in the year of ${javaneseYearName}`;
  } else if (isUnfavorable) {
    status = "unfavorable";
    message = `${javaneseMonth} is an unfavorable month for weddings and big events in the year of ${javaneseYearName}. Consider choosing a different month.`;
  } else {
    status = "neutral";
    message = `${javaneseMonth} is neither explicitly favorable nor unfavorable for weddings and big events in the year of ${javaneseYearName}.`;
  }

  return {
    date: `${javaneseDayName}, ${javaneseDate} ${javaneseMonth} ${javaneseYear} (${javaneseYearName})`,
    status: status,
    message: message,
    favorableMonths: yearData.favorableMonths,
    unfavorableMonths: yearData.unfavorableMonths,
  };
}

export function checkDayFavorability(dayName, date, month, year, yearName) {
  let dayOfWeek = dayName.split(" ")[0];

  // Find the month data
  const monthData = favorableDaysofMonths?.find(
    (m) => m.month.toLowerCase() === month.toLowerCase()
  );

  if (!monthData) {
    return {
      status: "unknown",
      message: `Could not find data for month ${month}`,
    };
  }

  const rahayuList = monthData.rahayuDays.join(", ");
  const sarjuList = monthData.sarjuDays.join(", ");
  const rahayuCount = monthData.rahayuDays.length;
  const sarjuCount = monthData.sarjuDays.length;

  const summarySentence = `For ${month} month, the very favorable (rahayu) day${
    rahayuCount > 1 ? "s are" : " is"
  } ${rahayuList} and reasonably favorable (sarju) day${
    sarjuCount > 1 ? "s are" : " is"
  } ${sarjuList}. These days are good for important activities, ceremonies, or starting new ventures.`;

  return {
    date: `${dayName}, ${date} ${month} ${year} (${yearName})`,
    message: summarySentence,
    rahayuDays: monthData.rahayuDays,
    sarjuDays: monthData.sarjuDays,
    dayOfWeek: dayOfWeek,
  };
}

export function checkMonthAuspiciousness(monthName) {
  const monthData = inauspiciousDatesinMonth?.find(
    (m) => m.month.toLowerCase() === monthName.toLowerCase()
  );

  if (!monthData) {
    return {
      status: "error",
      message: `Month "${monthName}" not found in the Javanese calendar data.`,
    };
  }

  return {
    month: monthData.month,
    inauspiciousDates: monthData.dates,
    taliwangkeDay: monthData.taliwangkeDay,
    consequence: monthData.consequence,
    message: `In the month of ${
      monthData.month
    }, you should avoid dates ${monthData.dates.join(", ")} and the day of ${
      monthData.taliwangkeDay
    }. Ignoring these warnings may result in "${monthData.consequence}".`,
  };
}

function getSaptawara(date) {
  try {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const dayOfMonth = date.getUTCDate();

    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;

    const jdn =
      dayOfMonth +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045;

    const pasaranIndex = jdn % 5;
    const pasaranNames = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
    const pasaran = pasaranNames[pasaranIndex];

    const dayIndex = date.getUTCDay();
    const namaHari = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];

    const neptuDina = {
      Jumat: 1,
      Sabtu: 2,
      Minggu: 3,
      Senin: 4,
      Selasa: 5,
      Rabu: 6,
      Kamis: 7,
    };

    const neptuPasaran = {
      Kliwon: 1,
      Legi: 2,
      Pahing: 3,
      Pon: 4,
      Wage: 5,
    };

    const hari = namaHari[dayIndex];
    // const day = nameDay[dayIndex];

    const dayNept = neptuDina[hari];
    const pasaranNept = neptuPasaran[pasaran];

    if (dayNept === undefined || pasaranNept === undefined) {
      throw new Error(
        "Neptu calculation failed for derived day/pasaran names."
      );
    }
    const totalNeptu = dayNept + pasaranNept;
    const saptawaraNeptu = totalNeptu % 7;
    const saptawara = nameSaptawara[saptawaraNeptu];

    return saptawara;
  } catch (error) {
    console.error("Error in getWeton function:", error);
    return null;
  }
}

function getRakam(date) {
  try {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const dayOfMonth = date.getUTCDate();

    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;

    const jdn =
      dayOfMonth +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045;

    const pasaranIndex = jdn % 5;
    const pasaranNames = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
    const pasaran = pasaranNames[pasaranIndex];

    const dayIndex = date.getUTCDay();
    const namaHari = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];

    const neptuDina = {
      Jumat: 1,
      Sabtu: 2,
      Minggu: 3,
      Senin: 4,
      Selasa: 5,
      Rabu: 6,
      Kamis: 7,
    };

    const neptuPasaran = {
      Kliwon: 1,
      Legi: 2,
      Pahing: 3,
      Pon: 4,
      Wage: 5,
    };

    const hari = namaHari[dayIndex];
    // const day = nameDay[dayIndex];

    const dayNept = neptuDina[hari];
    const pasaranNept = neptuPasaran[pasaran];

    if (dayNept === undefined || pasaranNept === undefined) {
      throw new Error(
        "Neptu calculation failed for derived day/pasaran names."
      );
    }

    const totalNeptu = dayNept + pasaranNept;
    const rakamNeptu = totalNeptu % 6;
    const rakam = nameRakam[rakamNeptu];

    return rakam;
  } catch (error) {
    console.error("Error in getWeton function:", error);
    return null;
  }
}

export function getWeton(birthDate, birthTime) {
  try {
    let date;
    let workingDate;
    if (
      typeof birthDate === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(birthDate)
    ) {
      // date = new Date(`${birthDate}T12:00:00Z`); // Use noon UTC
      workingDate = new Date(birthDate);
    } else if (birthDate instanceof Date) {
      workingDate = new Date(birthDate.getTime());

      // const year = birthDate.getFullYear();
      // const month = String(birthDate.getMonth() + 1).padStart(2, "0");
      // const day = String(birthDate.getDate()).padStart(2, "0");
      // date = new Date(
      //   `<span class="math-inline">\{year\}\-</span>{month}-${day}T12:00:00Z`
      // );
    } else {
      throw new Error(
        "Invalid Date Input type/format. Use YYYY-MM-DD string or Date object."
      );
    }

    // if (isNaN(date.getTime())) {
    //   throw new Error("Invalid Date Input value");
    // }

    if (isNaN(workingDate.getTime())) {
      throw new Error("Invalid Date Input value");
    }

    if (birthTime) {
      const [hours] = birthTime.split(":").map(Number);
      // console.log("Birth time hours:", hours);
      if (hours >= 18) {
        // console.log("Adjusting date for evening birth time", hours);
        workingDate.setDate(workingDate.getDate() + 1);
      }
    }

    const yearTemp = workingDate.getFullYear();
    const monthTemp = String(workingDate.getMonth() + 1).padStart(2, "0");
    const dayTemp = String(workingDate.getDate()).padStart(2, "0");

    // console.log("workingDate:", workingDate);

    date = new Date(`${yearTemp}-${monthTemp}-${dayTemp}T12:00:00Z`);

    // console.log("workingDate:", workingDate, "date", date);

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const dayOfMonth = date.getUTCDate();

    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;

    const jdn =
      dayOfMonth +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045;

    const pasaranIndex = jdn % 5;
    const pasaranNames = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
    const pasaran = pasaranNames[pasaranIndex];

    const dayIndex = date.getUTCDay();
    const namaHari = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];

    const nameDay = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const hari = namaHari[dayIndex];
    const day = nameDay[dayIndex];

    const dayNept = neptuDina[hari];
    const pasaranNept = neptuPasaran[pasaran];

    if (dayNept === undefined || pasaranNept === undefined) {
      throw new Error(
        "Neptu calculation failed for derived day/pasaran names."
      );
    }
    const totalNeptu = dayNept + pasaranNept;

    const day_character = watakHari[dayIndex];
    const pasaran_character = watakPasaran[pasaranIndex];
    const neptu_character = watakTotalNeptu[totalNeptu - 7];

    // console.log(day_character, pasaran_character, neptu_character);

    //pancasuda
    const pancasudaNeptu = totalNeptu % 5;
    const pancasuda = namePancasuda[pancasudaNeptu];

    const laku = nameLaku[totalNeptu - 7];

    const saptawara = getSaptawara(date);
    const rakam = getRakam(date);
    const hastawara = getHastawara(birthDate);
    const sadwara = getSadwara(birthDate);
    const watakWeton = getWatakWeton(`${hari} ${pasaran}`);

    // console.log(day, pasaran);

    return {
      dina: hari,
      dina_en: day,
      day_character: day_character,
      pasaran: pasaran,
      pasaran_character: pasaran_character,
      neptu_dina: dayNept,
      neptu_pasaran: pasaranNept,
      total_neptu: totalNeptu,
      neptu_character: neptu_character,
      weton: `${hari} ${pasaran}`,
      weton_en: `${day} ${pasaran}`,
      pancasuda: pancasuda,
      sadwara: sadwara,
      saptawara: saptawara,
      hastawara: hastawara,
      rakam: rakam,
      laku: laku,
      watak_weton: watakWeton,
    };
  } catch (error) {
    console.error("Error in getWeton function:", error);
    return null;
  }
}

export function getWuku(birthDate, birthTime) {
  try {
    let date;
    let workingDate;
    if (
      typeof birthDate === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(birthDate)
    ) {
      // date = new Date(`${birthDate}T12:00:00Z`); // Use noon UTC
      workingDate = new Date(birthDate);
    } else if (birthDate instanceof Date) {
      workingDate = new Date(birthDate.getTime());
      // Ensure we use UTC parts of the passed Date object if needed
      // const year = birthDate.getFullYear();
      // const month = String(birthDate.getMonth() + 1).padStart(2, "0");
      // const day = String(birthDate.getDate()).padStart(2, "0");
      // date = new Date(
      //   `<span class="math-inline">\{year\}\-</span>{month}-${day}T12:00:00Z`
      // );
    } else {
      throw new Error(
        "Invalid Date Input type/format. Use YYYY-MM-DD string or Date object."
      );
    }

    // if (isNaN(date.getTime())) {
    //   throw new Error("Invalid Date Input value");
    // }

    if (isNaN(workingDate.getTime())) {
      throw new Error("Invalid Date Input value");
    }

    if (birthTime) {
      // console.log("Birth time provided:", birthTime);
      const [hours] = birthTime.split(":").map(Number);
      // console.log("Birth time hours:", hours);
      if (hours >= 18) {
        // console.log("Adjusting date for evening birth time", hours);
        workingDate.setDate(workingDate.getDate() + 1);
      }
    }

    const yearTemp = workingDate.getFullYear();
    const monthTemp = String(workingDate.getMonth() + 1).padStart(2, "0");
    const dayTemp = String(workingDate.getDate()).padStart(2, "0");

    date = new Date(`${yearTemp}-${monthTemp}-${dayTemp}T12:00:00Z`);

    // console.log("workingDate:", workingDate, "date", date);

    const namaHari = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const dayOfMonth = date.getUTCDate();

    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;

    const jdn =
      dayOfMonth +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045;

    //wuku calculation
    const wuku_index = (Math.floor((jdn - 6) / 7) + 10) % 30;
    const wuku = nameWuku[wuku_index];

    //saptawara for wuku
    const dayIndex = date.getUTCDay();
    const hari = namaHari[dayIndex];
    const neptu_saptawara = neptuSaptawara[hari];

    //angka pakuwon calculation
    const pawukon_number = wuku_index * 7 + neptu_saptawara;

    return {
      god: wuku.god,
      god_meaning: wuku.god_meaning,
      name: wuku.name,
      character: wuku.character,
      short_character: wuku.short_character,
      tree: wuku.tree,
      tree_meaning: wuku.tree_meaning,
      bird: wuku.bird,
      bird_meaning: wuku.bird_meaning,
      wuku_bilangan: wuku.wuku_bilangan,
      pawukon: pawukon_number,
    };
  } catch (error) {
    console.error("Error in getWuku function:", error);
    return null;
  }
}

const getSadwara = (birthDate) => {
  //sadwara calculation
  const wuku = getWuku(birthDate);
  const pawukon_number = wuku.pawukon;
  const sadwara_index = pawukon_number % 6;
  const sadwara = nameSadwara[sadwara_index];

  return sadwara;
};

const getHastawara = (birthDate) => {
  let hastawara_index;
  const wuku = getWuku(birthDate);
  const pawukon_number = wuku.pawukon;

  // if (pawukon_number > 72) {
  //   hastawara_index = pawukon_number % 8;
  // } else {
  //   hastawara_index = (pawukon_number + 2) % 8;
  // }
  hastawara_index = pawukon_number % 8;
  const hastawara = nameHastawara[hastawara_index];

  return hastawara;
};

export function getWetonJodoh(weton1, weton2) {
  // console.log("Calculating Weton Jodoh for:", weton1, weton2);
  if (!weton1 || !weton2) {
    throw new Error("Both weton1 and weton2 must be provided.");
  }

  const totalNeptu1 = weton1.weton.total_neptu;
  const totalNeptu2 = weton2.weton.total_neptu;

  const combinedNeptu = totalNeptu1 + totalNeptu2;

  const jodoh4 = getJodoh4(combinedNeptu);
  const jodoh5 = getJodoh5(combinedNeptu);
  const jodoh7 = getJodoh7(combinedNeptu);
  const jodoh8 = getJodoh8(combinedNeptu);
  const jodoh9 = getJodoh9(totalNeptu1, totalNeptu2);
  const jodohDay = getJodohDay(weton1.weton.dina, weton2.weton.dina);

  return {
    jodoh4: jodoh4,
    jodoh5: jodoh5,
    jodoh7: jodoh7,
    jodoh8: jodoh8,
    jodoh9: jodoh9,
    jodohDay: jodohDay,
  };
}

const getJodoh4 = (combinedNeptu) => {
  const weton_index = combinedNeptu % 4;
  return nameDivison4[weton_index];
};

const getJodoh5 = (combinedNeptu) => {
  const weton_index = combinedNeptu % 5;
  return nameDivison5[weton_index];
};

const getJodoh7 = (combinedNeptu) => {
  // console.log(
  //   "Combined Neptu for Jodoh7:",
  //   combinedNeptu,
  //   "sisa",
  //   combinedNeptu % 10
  // );
  let weton_index;
  let remainder10 = combinedNeptu % 10;

  if (remainder10 > 7) {
    weton_index = combinedNeptu % 7;
  } else {
    weton_index = combinedNeptu % 10;
  }

  // console.log(
  //   "Weton Index for Jodoh7:",
  //   weton_index,
  //   nameDivison7[weton_index]
  // );

  if (weton_index == 7) {
    return nameDivison7[0];
  } else {
    return nameDivison7[weton_index];
  }
};

const getJodoh8 = (combinedNeptu) => {
  const weton_index = combinedNeptu % 8;
  return nameDivison8[weton_index];
};

const getJodoh9 = (totalNeptu1, totalNeptu2) => {
  const weton1 = totalNeptu1 % 9 || 9;
  const weton2 = totalNeptu2 % 9 || 9;

  const sortedWeton = [weton1, weton2].sort((a, b) => a - b);
  const key = `${sortedWeton[0]}-${sortedWeton[1]}`;

  if (neptuCombination[key]) {
    return {
      weton1: weton1,
      weton2: weton2,
      result: neptuCombination[key],
    };
  } else {
    return "Kombinasi weton tidak ditemukan";
  }
};

const getJodohDay = (dina1, dina2) => {
  const dayOrder = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const sortedDina = [dina1, dina2].sort(
    (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
  );
  const key = `${sortedDina[0]}-${sortedDina[1]}`;

  // console.log(sortedDina, key);

  if (dinaCombination[key]) {
    return {
      dina1: dina1,
      dina2: dina2,
      result: dinaCombination[key],
    };
  } else {
    return "Kombinasi weton tidak ditemukan";
  }
};

function getWatakWeton(wetonName) {
  // console.log(wetonName);
  // Find the object where weton_name matches the provided name
  const wetonObject = watakWeton.find((item) => item.weton === wetonName);
  // console.log(wetonObject);

  // Return the description if found, otherwise return a message
  return wetonObject ? wetonObject : "Weton not found";
}

export function getDayInformation(today) {
  const todayWeton = getWeton(today)?.weton_en;
  const todayWuku = getWuku(today)?.name;

  // Get the basic day information
  const dayInfo = dayCharacters.find((item) => item.day === todayWeton) || {};
  const taliwangkeDay =
    taliwangkeDays.find(
      (item) => item.day == todayWeton && item.wuku == todayWuku
    ) || {};
  const samparwangkeDay =
    samparwangkeDays.find(
      (item) => item.day == todayWeton && item.wuku == todayWuku
    ) || {};
  // Combine the information
  return {
    todayWeton: todayWeton,
    todayWuku: todayWuku,
    dayInfo: dayInfo,
    taliwangkeDay: taliwangkeDay,
    samparwangkeDay: samparwangkeDay,
  };
}

export function convertToMarkdownList(text) {
  let formatted = text.replace(/(\s+)(\d+\.)/g, "\n$2");

  if (!/^\d+\./.test(formatted)) {
    formatted = formatted.replace(/^\n/, "");
  }

  return formatted;
}

export function getCompatibilitySlug(hyphenatedString) {
  const words = hyphenatedString.split("-");
  return words.length >= 3 ? words[2] : null;
}

export function getWetonEmojiScore(score) {
  if (typeof score !== "number" || score < 0 || score > 100) {
    return "❓";
  }
  if (score >= 0 && score <= 20) {
    return "💔"; // Incompatible
  } else if (score <= 50) {
    return "🤔"; // Challenging
  } else if (score <= 70) {
    return "🙂"; // Average
  } else if (score <= 85) {
    return "😊"; // Good
  } else if (score <= 95) {
    return "🥰"; // Excellent
  } else {
    // The only remaining possibility is 96-100
    return "💎"; // Perfect
  }
}
