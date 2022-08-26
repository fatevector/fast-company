const Bookmark = ({ status, onToggleBookmark }) => {
    return (
        <h4>
            <i
                className={`bi bi-bookmark${status ? "-fill" : ""}`}
                onClick={onToggleBookmark}
            ></i>
        </h4>
    );
};

export default Bookmark;
