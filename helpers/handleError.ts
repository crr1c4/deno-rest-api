import { bold, bgRgb24 } from 'https://deno.land/std@0.109.0/fmt/colors.ts';

interface ErrorType {
  message: string;
  status: number;
}

/**
 * @param message Message to interprate error message.
 * @param status HTTP protocol response.
 * @returns object with params, to handle error response.
 */
const handleError = (message: string, status: number): ErrorType => {
  const fmtError = bgRgb24(bold(" ERROR "), { r: 255, g:0, b: 0 })
  console.error(`${fmtError} ${message}`);
  return { message, status };
};

export default handleError;
