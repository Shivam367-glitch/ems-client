export const validate = (formData) => {
  const errors = {};

  if (!formData.title.trim()) {
    errors.title = "Please enter the event title.";
  }

  if (!formData.description.trim()) {
    errors.description = "Please provide a short description for the event.";
  }

  if (!formData.dateTime) {
    errors.dateTime = "Please select the event date and time.";
  }

  if (!formData.venue.trim()) {
    errors.venue = "Please enter the event venue.";
  }

  if (formData.entryFee === "" || Number(formData.entryFee) < 0) {
    errors.entryFee = "Please enter a valid event entry fee.";
  }

  if (formData.totalSeats === "" || Number(formData.totalSeats) <= 0) {
    errors.totalSeats = "Please enter a valid number of seats.";
  }

  if (!formData.status) {
    errors.status = "Please select event status.";
  }

  return errors;
};