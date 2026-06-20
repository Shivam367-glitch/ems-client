
import EventForm from "../components/EventForm";

const CreateEventPage = () => {
    return (
        <> 
            <div className="container mt-4  d-flex justify-content-center">

                <div className="card shadow p-4 col-lg-6">

                    <h2 className="mb-4">
                        Create New Event
                    </h2>
                    <EventForm />

                </div>

            </div>
        </>

    );
};

export default CreateEventPage;
