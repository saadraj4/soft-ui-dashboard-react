import { format } from 'date-fns';

// Function to format the date as dd-mm-yyyy
export const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd-MM-yyyy');
};
