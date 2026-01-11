/**
 * Validation Utilities
 * 
 * Centralized validation functions for use throughout the application.
 * All validation logic should be defined here to avoid code duplication.
 */

/**
 * Validates an email address format
 * @param email - The email address to validate
 * @returns true if the email format is valid
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a phone number (local number without country code)
 * Requires at least 7 digits
 * @param localNumber - The local phone number to validate
 * @returns true if the phone number is valid
 */
export function validatePhoneNumber(localNumber: string): boolean {
  const digitsOnly = localNumber.replace(/[^\d]/g, "");
  return digitsOnly.length >= 7;
}

/**
 * Validates that a string is not empty after trimming whitespace
 * @param value - The string to validate
 * @returns true if the string has content
 */
export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validates a URL format
 * @param url - The URL to validate
 * @returns true if the URL format is valid
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates minimum string length
 * @param value - The string to validate
 * @param minLength - Minimum required length
 * @returns true if the string meets minimum length
 */
export function validateMinLength(value: string, minLength: number): boolean {
  return value.trim().length >= minLength;
}

/**
 * Validates maximum string length
 * @param value - The string to validate
 * @param maxLength - Maximum allowed length
 * @returns true if the string is within maximum length
 */
export function validateMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}
