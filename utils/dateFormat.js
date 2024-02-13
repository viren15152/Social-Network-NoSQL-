// Function to add suffix to day of the month (e.g., 'st', 'nd', 'rd', 'th')
const addDateSuffix = (date) => {
    let dateStr = date.toString();
  
    // Get last character of the date string
    const lastChar = dateStr.charAt(dateStr.length - 1);
  
    // Add suffix based on the last character of the date string
    if (lastChar === '1' && dateStr !== '11') {
      dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
      dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
      dateStr = `${dateStr}rd`;
    } else {
      dateStr = `${dateStr}th`;
    }
  
    return dateStr;
  };
  
  // Main function to format a timestamp
  module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
  ) => {
    // Create month object mapping month numbers to month names
    const months = {
      0: monthLength === 'short' ? 'Jan' : 'January',
      1: monthLength === 'short' ? 'Feb' : 'February',
      2: monthLength === 'short' ? 'Mar' : 'March',
      3: monthLength === 'short' ? 'Apr' : 'April',
      4: monthLength === 'short' ? 'May' : 'May',
      5: monthLength === 'short' ? 'Jun' : 'June',
      6: monthLength === 'short' ? 'Jul' : 'July',
      7: monthLength === 'short' ? 'Aug' : 'August',
      8: monthLength === 'short' ? 'Sep' : 'September',
      9: monthLength === 'short' ? 'Oct' : 'October',
      10: monthLength === 'short' ? 'Nov' : 'November',
      11: monthLength === 'short' ? 'Dec' : 'December',
    };
  
    // Create a new Date object from the provided timestamp
    const dateObj = new Date(timestamp);
    
    // Get formatted month name based on month number
    const formattedMonth = months[dateObj.getMonth()];
  
    // Format day of the month with or without suffix
    const dayOfMonth = dateSuffix
      ? addDateSuffix(dateObj.getDate())
      : dateObj.getDate();
  
    // Get year from the timestamp
    const year = dateObj.getFullYear();
  
    // Get hour from the timestamp (12-hour format)
    let hour =
      dateObj.getHours() > 12
        ? Math.floor(dateObj.getHours() - 12)
        : dateObj.getHours();
  
    // If hour is 0 (12:00am), change it to 12
    if (hour === 0) {
      hour = 12;
    }
  
    // Get minutes from the timestamp and pad with '0' if necessary
    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
  
    // Set 'am' or 'pm' based on the hour
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';
  
    // Construct the formatted timestamp string
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  
    // Return the formatted timestamp
    return formattedTimeStamp;
  };
  