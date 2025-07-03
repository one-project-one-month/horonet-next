export type CommonProcedureResult<T> = Promise<
  { success: false; message: string } | { success: true; data: T }
>;

export type TZodiacSigns = "Aquarius" | "Aries" | "Cancer" | "Capricorn" | "Gemini" | "Leo" | "Libra" | "Pisces" | "Sagittarius" | "Scorpio" | "Taurus" | "Virgo";
