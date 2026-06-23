
import EventForm from "../components/EventForm";

const CreateEventPage = () => {
    return (
        <> 
            <div className="container d-flex justify-content-center mt-4 pb-3">

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
