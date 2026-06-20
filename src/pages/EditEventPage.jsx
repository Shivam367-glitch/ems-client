import { useParams } from "react-router-dom";
import EventForm from "../components/EventForm";
import { useEffect, useState } from "react";
import { getEventById } from "../services/eventApi";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const EditEventPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => { 
            try {
                 setLoading(true);
                const response = await getEventById(id); 
                 if(response.data.success){
                     setEvent(response.data.data);
                 }
            } catch (error) { 
                toast.error(error.response?.data?.message || "Something went wrong");
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

            <div className="container d-flex justify-content-center mt-4 pb-3">
                <div className="card shadow p-4 col-lg-6">

                    <h2>Edit Event</h2>

                    <EventForm initialData={event} eventId={id} />

                </div>
            </div>
        </>
    );
};

export default EditEventPage;