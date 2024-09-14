export function isValidPhoneNumber(number: string): boolean {
  const phoneNumberRegex = /^\d{10}$/;
  return phoneNumberRegex.test(number);
}
