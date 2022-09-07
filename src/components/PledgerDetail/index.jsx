import React from "react";
import { useEffect, useState } from "react";

function PledgerDetail({ supporter }) {

    const [pledgerData, setPledgerData] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}users/${supporter}`)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setPledgerData(data);
            });
    }, [supporter]);

    if (!pledgerData) {
        return null;
    }

    return <span>{pledgerData.username}</span>
}

export default PledgerDetail;