import { useState } from 'react';

export default function ExpandableText ({ text, maxLength}: {text: string, maxLength: number}) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    if (text.length <= maxLength) return <p>{text}</p>;
    
    return (
        <p>
            {isExpanded ? text : `${text.substring(0, maxLength)}...`}
            <span 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    color: '#2a7fdd',
                    cursor: 'pointer',
                    marginLeft: '5px'
                }}
            >
                {isExpanded ? 'Свернуть' : 'Читать далее'}
            </span>
        </p>
    );
};