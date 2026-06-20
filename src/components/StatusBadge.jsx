const StatusBadge = ({ status }) => {
    let badgeClass;

    switch (status) {
        case "Published":
            badgeClass = "bg-success";
            break;
        case "Draft":
            badgeClass = "bg-warning";
            break;
        case "Cancelled":
            badgeClass = "bg-danger";
            break;
        default:
            badgeClass = "bg-secondary";
    }

    return (
        <span className={`badge  badge-pill ${badgeClass}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
