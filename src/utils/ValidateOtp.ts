export function isValidOtp(input: string): boolean {
  const phoneRegex = /^[0-9]\d{5}$/
  return phoneRegex.test(input)
}
