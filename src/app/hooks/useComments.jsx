import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useAuth } from "./useAuth";
// import { toast } from "react-toastify";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    const { currentUser } = useAuth();
    // const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    // const [error, setError] = useState(null);

    useEffect(() => {
        setComments(null);
    }, []);

    const createComment = async data => {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id
        };
        console.log(comment);
    };

    return (
        <CommentsContext.Provider value={{ comments, createComment }}>
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
