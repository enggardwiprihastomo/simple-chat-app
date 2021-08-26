import React from "react"

interface IProps {
    data: string[]
}

export default function Errors({ data }: IProps) {
    return (
        <ul className="errors">
            {data.map((error, idx) => (
                <li key={`error-${idx}`}>{error}</li>
            ))}
        </ul>
    )
}