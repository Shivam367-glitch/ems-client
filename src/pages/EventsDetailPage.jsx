import { useNavigate, useParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { getEventById } from "../services/eventApi";
import { useEffect, useState } from "react";
import { dateFormatter } from "../utils/DateFormatter";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const EventDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [event, setEvent] = useState(null); 
    const[loading,setLoading]=useState(false);

    useEffect(() => {
        const fetchEvent = async () => { 

            try { 
                setLoading(true);
                const response = await getEventById(id); 

                if(response.data.success){

                    setEvent(response.data.data);
                }
                
            } catch (error) { 
                toast.error(error.response?.data?.message || "Something went wrong")
            } 
            finally{
                setLoading(false);
            }
        };


        fetchEvent();

    }, [id]);

    if (loading) {
        return (<Loader msg={"Loading event..."}/> );
    } 

    if(!loading && !event)return  <div className="card shadow-sm p-5 text-center">
                    <h4>Event Detail Not Found!</h4>
                </div>

    return (
        <> 


            <div className="container mt-3 mt-md-5 d-flex justify-content-center">

                <div className="card shadow-sm p-3 p-md-4 col-lg-6">

                    <h2 className="mb-4 text-center text-md-start">
                        Event Details
                    </h2>

                    <div className="mb-3">
                        <span className="fw-bold">Title </span>
                        <p className="mb-0">{event.title}</p>
                    </div>

                    <div className="mb-4">
                        <span className="fw-bold">Description</span>
                        <p className="mb-0 mt-1">
                            {event.description}
                        </p>
                    </div>

                   
                    <div className="row">

                        <div className="col-6 col-md-6 mb-3">
                            <span className="fw-bold">
                                Date & Time 
                            </span>
                            <p className="mb-0">
                                {dateFormatter(event.dateTime)}
                            </p>
                        </div>

                        <div className="col-6 col-md-6 mb-3">
                            <span className="fw-bold">
                                Venue 
                            </span>
                            <p className="mb-0">
                                {event.venue}
                            </p>
                        </div>

                        <div className="col-6 col-md-6 mb-3">
                            <span className="fw-bold">
                                Entry Fee 
                            </span>
                            <p className="mb-0">
                                ₹{event.entryFee}
                            </p>
                        </div>

                        <div className="col-6 col-md-6 mb-3">
                            <span className="fw-bold">
                                Total Seats 
                            </span>
                            <p className="mb-0">
                                {event.totalSeats}
                            </p>
                        </div>

                        <div className="col-12 mb-4">
                            <span className="fw-bold">
                                Status 
                            </span>{" "}
                            <StatusBadge
                                status={event.status}
                            />
                        </div>

                    </div>

                    <div className="d-flex flex-column flex-md-row gap-2">

                        <button
                            className="btn btn-secondary w-100"
                            onClick={() => navigate("/")}
                        >
                            Back
                        </button>

                        <button
                            className="btn btn-warning w-100"
                            onClick={() =>
                                navigate(
                                    `/edit-event/${event._id}`
                                )
                            }
                        >
                            Edit Event
                        </button>

                    </div>

                </div>
            </div>
        </>


    );
};

export default EventDetailsPage;
