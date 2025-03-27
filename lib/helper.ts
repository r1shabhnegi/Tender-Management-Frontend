export function capitalizeFirstLetter(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const generateUniqueId = (fileName: string) => {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 10)}-${fileName}`;
};
