export const safeJsonParse = <T>(json: string): T => {
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    throw new Error('[safeJsonParse] : ' + JSON.stringify(e));
  }
};

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) {
    return 'N/A'; // Or any other default value you prefer
  }

  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
