import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { deleteEvent } from "../services/eventApi";
import { dateFormatter } from "../utils/DateFormatter";
import Pagination from "./Pagination";
import { toast } from "react-toastify";

const EventTable = ({
    events,
    page,
    totalPages,
    setPage
}) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmDelete =
            window.confirm(
                "Are you sure?"
            );


        if (!confirmDelete) return;

        try {
            await deleteEvent(id);
            toast.success("Deleted successfully"); 
            setTimeout(() => {
                window.location.reload();
            }, 2000)

        } catch (error) { 
             toast.success(error.message);
        }


    };

    return (
        <>

            <div className="table-responsive-lg overflow-auto">

                <table className="table table-bordered table-hover align-middle">

                    <thead className="table-dark">
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Venue</th>
                            <th>Fee</th>
                            <th>Seats</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {events.map((event) => (
                            <tr key={event._id}>

                                <td className="text-nowrap">
                                    {event.title}
                                </td>

                                <td className="text-nowrap">
                                    {dateFormatter(
                                        event.dateTime
                                    )}
                                </td>

                                <td className="text-nowrap">
                                    {event.venue}
                                </td>

                                <td>
                                    ₹{event.entryFee}
                                </td>

                                <td>
                                    {event.totalSeats}
                                </td>

                                <td>
                                    <StatusBadge
                                        status={event.status}
                                    />
                                </td>

                                <td>
                                    <div className="d-flex flex-wrap gap-2">

                                        <button
                                            className="btn btn-info btn-sm"
                                            onClick={() =>
                                                navigate(
                                                    `/events/${event._id}`
                                                )
                                            }
                                        >
                                            View
                                        </button>

                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() =>
                                                navigate(
                                                    `/edit-event/${event._id}`
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                handleDelete(
                                                    event._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
            />
        </>

    );
};

export default EventTable;
