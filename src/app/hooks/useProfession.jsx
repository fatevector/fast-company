import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import professionService from "../services/profession.service";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);

    const errorCatcher = error => {
        const { message } = error.response.data;
        setError(message);
    };

    useEffect(() => {
        getProfessionsList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    const getProfessionsList = async () => {
        try {
            const { content } = await professionService.get();
            setProfessions(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getProfession = id => {
        return professions.find(prof => prof._id === id);
    };

    return (
        <ProfessionContext.Provider
            value={{ isLoading, professions, getProfession }}
        >
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
