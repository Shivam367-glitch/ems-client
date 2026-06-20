import { useNavigate } from "react-router-dom";

const EventFilters = ({status,setStatus,setPage,search,setSearch}) => {
    const navigate = useNavigate();

    const handleStatus = (e) => {
        setStatus(e.target.value);
        setPage(1);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    return (
    <div className="row g-3 mb-4 justify-content-between  ">
        <div className="col-6 col-md-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search event by title..."
                value={search}
                onChange={handleSearch}
            />
        </div>

        <div className="col-6 col-md-3">
            <select
                className="form-select"
                value={status}
                onChange={handleStatus}
            >
                <option value="All">
                    All Status
                </option>
                <option value="Draft">
                    Draft
                </option>
                <option value="Published">
                    Published
                </option>
                <option value="Cancelled">
                    Cancelled
                </option>
            </select>
        </div>

        <div className="col-12 col-md-4">
            <button
                className="btn btn-primary "
                onClick={() =>
                    navigate("/create-event")
                }
            >
                + Create Event
            </button>
        </div>

    </div>


    );
};

export default EventFilters;
