import { useEffect, useState } from "react";
import EventFilters from "../components/EventFilters";
import EventTable from "../components/EventTable";
import { getAllEvents } from "../services/eventApi";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const EventsPage = () => {

    const [events, setEvents] = useState([]);
    const [status, setStatus] = useState("All");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);

                const response = await getAllEvents({status,page,search}); 
                if(response.data.success){
                    
                    setEvents(response.data.data);
                    setTotalPages(response.data.totalPages);
                }

            } catch (error) { 
                toast.error(error.response?.data?.message || "Something went wrong") 
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();


    }, [status, page, search]);

    return (
        <div className="container py-4"> 
                <EventFilters
                    status={status}
                    setStatus={setStatus}
                    setPage={setPage}
                    search={search}
                    setSearch={setSearch}
                />

            {loading ? (
                <Loader msg={"Loading events..."}/>
            ) : !loading && events.length === 0 ? (

                <div className="card shadow-sm p-5 text-center">

                    <h4>No Events Found</h4>

                    <p className="text-muted">
                        Try changing search or filter.
                    </p>

                </div>

            ) : (

                <div className="card shadow-sm p-3">

                    <EventTable
                        events={events}
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                    />

                </div>
            )}

        </div>

    );
};

export default EventsPage;
