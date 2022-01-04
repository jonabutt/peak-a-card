import React from 'react'

interface Props {
    value: number
}

export const Card: React.FC<Props> = ({value}) => {
        return (
            <div className="card">
                {value}
            </div>
        );
}