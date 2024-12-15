// Function to format the column name
export const formatColumnName = (columnKey: string): string => {
  // Replace camel case like "karakteristikaD" to "Karakteristika D"
  const formatted = columnKey.replace(/([a-z])([A-Z])/g, '$1 $2');
  // Capitalize the first letter of each word
  return formatted.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Debounce utility function to limit the rate of function calls
export const debounce = <F extends (...args: any[]) => any>(
  func: F, // The function to debounce
  waitFor = 250 // The delay (in milliseconds) before the function is called after the last event
): any => {
  let timeout: any; // This will hold the timeout ID, used to clear the previous timeout

  // Return a new function that will be debounced
  return (...args: any[]) => {
    // Clear the previous timeout if it exists
    clearTimeout(timeout);
    // Set a new timeout to invoke the function after the specified delay (waitFor)
    timeout = setTimeout(() => func(...args), waitFor);
  };
};
