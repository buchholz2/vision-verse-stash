export const WHATSAPP_NUMBER = "555596693480";
export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá, Dr. Gabriel! Gostaria de agendar uma avaliação.";

export const whatsappLink = (message: string = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const INSTAGRAM_URL = "https://www.instagram.com/gabirockenbachp/";
export const PROFESSIONAL_NAME = "Gabriel Paulo Rockenbach";
export const PROFESSIONAL_TITLE = "Cirurgião-dentista | Especialista em Ortodontia";
export const CRO = "CRO 29705";
export const PHONE_DISPLAY = "+55 55 9669-3480";
