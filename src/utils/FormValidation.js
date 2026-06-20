export const validate = (formData) => {
  const errors = {};

  if (!formData.title.trim()) {
    errors.title = "Please enter the event title.";
  } else if (formData.title.trim().length < 3 || formData.title.trim().length > 100) {
    errors.title = "Title will be of min 3 and max of 100 length."
  }

  if (!formData.description.trim()) {
    errors.description = "Please provide a short description for the event.";
  } else if (formData.description.length < 5 || formData.description.length > 500) {
    errors.description = "Description will be of min 5 and max of 500 length.";
  }

  if (!formData.dateTime) {
    errors.dateTime = "Please select the event date and time.";
  }
  else if (new Date(formData.dateTime) < new Date()) {
    errors.dateTime = "Event date and time cannot be in the past.";
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