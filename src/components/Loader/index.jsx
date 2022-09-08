import React, { useState, useEffect } from 'react';

const Loader = (props) => {
    const { projectData } = props;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [projectData]);

    return (
        <div class="loader-wrapper">
            <div class="loader">
            </div>
        </div>
    );
};

export default Loader;