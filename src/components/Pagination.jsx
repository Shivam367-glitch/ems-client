const Pagination = ({page,totalPages,setPage}) => {
    return (
        <div className="d-flex  mt-4 ">
            <button
                className="btn btn-secondary me-2"
                disabled={page === 1}
                onClick={() =>
                    setPage(page - 1)
                }
            >
             {`<<`}
            </button>

            <span className="mt-2">
                Page {page} of {totalPages}
            </span>

            <button
                className="btn btn-secondary ms-2"
                disabled={page === totalPages}
                onClick={() =>
                    setPage(page + 1)
                }
            >
               { ">>"}
            </button>

        </div>

    );
};

export default Pagination;
