
const Loader = ({msg}) => {
    return (
        <div className="text-center mt-5">

            <div className="spinner-border">
            </div>

            <p className="mt-2">
                {msg}
            </p>

        </div>
    )
}

export default Loader