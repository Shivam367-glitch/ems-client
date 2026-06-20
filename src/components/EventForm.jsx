import { useState } from "react";
import { createEvent, updateEvent } from "../services/eventApi";
import { useNavigate } from "react-router-dom";
import { validate } from "../utils/FormValidation";
import FormError from "./FormError";
import { toast } from "react-toastify";

const EventForm = ({ initialData, eventId }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      dateTime: "",
      venue: "",
      entryFee: "",
      totalSeats: "",
      status: "Draft",
    }
  );

  const [errors, setErrors] = useState({});  
  const[submit,setSubmit]=useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (eventId) {
        const updatedData = {};

        for (let field in formData) {
          if (formData[field] !== initialData[field]) {
            updatedData[field] = formData[field];
          }
        }

        if (!Object.keys(updatedData).length) {
          setErrors({ general: "No changes detected!" });
          return;
        }
        setSubmit(true);

        const response = await updateEvent(eventId, updatedData);

        if (response.data.success) {
          toast.success("Event Updated")
          navigate("/");
        } else {
          setErrors({
            general: response.data.message || "Update failed",
          });
        }
      } else {
        const response = await createEvent(formData);

        if (response.data.success) { 
           toast.success("Event Created")
          navigate("/");
        } else {
          setErrors({
            general: response.data.message || "Event creation failed",
          });
        }
      }
    } catch (error) {
      setErrors({
        general: error.response?.data?.message || "Something went wrong",
      });
    } 
    finally{
      setSubmit(false)
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {errors.general && (
        <div className="alert alert-danger">{errors.general}</div>
      )}

      <div className="mb-3">
        <label className="form-label">Event Title</label>
        <input
          type="text"
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && (
          <FormError msg={errors.title}/>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && (
           <FormError msg={errors.description}/>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Date & Time</label>
        <input
          type="datetime-local"
          className={`form-control ${errors.dateTime ? "is-invalid" : ""}`}
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
        />
        {errors.dateTime && (
           <FormError msg={errors.dateTime}/>
        )}
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Entry Fee</label>
          <input
            type="number"
            className={`form-control ${errors.entryFee ? "is-invalid" : ""}`}
            name="entryFee"
            value={formData.entryFee}
            onChange={handleChange}
          />
          {errors.entryFee && (
           <FormError msg={errors.entryFee}/>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Total Seats</label>
          <input
            type="number"
            className={`form-control ${errors.totalSeats ? "is-invalid" : ""}`}
            name="totalSeats"
            value={formData.totalSeats}
            onChange={handleChange}
          />
          {errors.totalSeats && (  
             <FormError msg={errors.totalSeats}/>
          )}
        </div>
      </div> 

      <div className="row"> 
        <div className="mb-3 col-md-6">
        <label className="form-label">Venue</label>
        <input
          type="text"
          className={`form-control ${errors.venue ? "is-invalid" : ""}`}
          name="venue"
          value={formData.venue}
          onChange={handleChange}
        />
        {errors.venue && (
           <FormError msg={errors.venue}/>
        )}
      </div>

      <div className="mb-4 col-md-6">
        <label className="form-label">Status</label>
        <select
          className={`form-select ${errors.status ? "is-invalid" : ""}`}
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        {errors.status && (
         <FormError msg={errors.status}/>
        )}
      </div>
      </div>


      <button
        type="button"
        className="btn btn-secondary me-2"
        onClick={() => navigate("/")}
      >
        Cancel
      </button>

      <button type="submit" className="btn btn-primary">
        {eventId ? (submit ? "Updating..." : "Update Event") :  (submit ? "Updating..." : "Create Event")}
      </button>
    </form>
  );
};

export default EventForm;