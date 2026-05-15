  
  export default function formatDate(dateString) {
    return new Date(dateString).toLocaleString("en-US", {
        
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",

      hour: "numeric",
      minute: "2-digit",
    });
  }