/**
 * WhatsApp Integration Utility for Bhuntu Birthday Surprise
 * Base URL: https://wa.me/9779708349123?text=
 */
const PHONE_NUMBER = '9779708349123';

export const sendWhatsAppMessage = (rawMessage, title = '💖 Special Message from Bhuntu Site') => {
  if (!rawMessage || typeof rawMessage !== 'string') return;
  
  const formattedText = `*${title}*\n\n${rawMessage.trim()}\n\n~ Sent with love from your birthday site ✨`;
  const encodedText = encodeURIComponent(formattedText);
  const waUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedText}`;
  
  // Open WhatsApp in new window/tab or native app
  window.open(waUrl, '_blank', 'noopener,noreferrer');
};
