import Papa from 'papaparse';
import React from "react"

const CsvExport = ({ data, fileName }) => {
    const handleExport = () => {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');

        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, fileName);
        } else {
            link.href = URL.createObjectURL(blob);

            link.style = 'visibility:hidden';
            link.download = fileName;

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        }
    };

    return (
        <button onClick={handleExport}>Download CSV</button>
        
    );
};

export default CsvExport;
