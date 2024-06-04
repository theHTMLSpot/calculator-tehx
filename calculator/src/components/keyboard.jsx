import React, { useState } from 'react';

function Keyboard() {
    const [sum, setSum] = useState(""); // Initialize sum state

    const keys = [
        { label: 'C', id: 'clear', class: 'operation' },
        { label: "0", id: '', class: 'hidden' },
        { label: "0", id: '', class: 'hidden' },
        { label: '<-', id: 'backspace', class: 'operation' },
        { label: 1, id: '1' },
        { label: 2, id: '2' },
        { label: 3, id: '3' },
        { label: "x", id: 'times', class: 'operation' },
        { label: 4, id: '4' },
        { label: 5, id: '5' },
        { label: 6, id: '6' },
        { label: '÷', id: 'divide', class: 'operation' },
        { label: 7, id: '7' },
        { label: 8, id: '8' },
        { label: 9, id: '9' },
        { label: "+", id: 'plus', class: 'operation' },
        { label: 0, id: '0', class: 'key_0' },
        { label: "0", id: '', class: 'hidden' },
        { label: "-", id: 'minus', class: 'operation' },
        { label: "¬", id: 'submit', class: 'operation' }
    ];

    const handleClear = () => {
        setSum(""); // Clear the sum
    };

    const handleBackSpace = () => {
        setSum(prevSum => prevSum.slice(0, -1)); // Remove the last character from the sum
    };

    const handleClick = (label) => {
        if (label === "¬") {
            calculateSum();
        } else if (label === 'C') {
            handleClear();
        } else if (label === '<-') {
            handleBackSpace();
        } else {
            if (sum === 'Error')
                {
                    setSum("")
                }
            setSum(prevSum => prevSum + label);
        }
    };

    const calculateSum = () => {
        try {
            // Replace 'x' and '÷' with '*' and '/' for evaluation
            const expression = sum.replace(/x/g, '*').replace(/÷/g, '/');
            // Use Function constructor to safely evaluate the expression
            const result = new Function(`return (${expression})`)();
            setSum(result.toString());
        } catch (error) {
            setSum("Error");
        }
    };

    const listItems = keys.map((key) => (
        <li 
            key={key.id} 
            onClick={() => handleClick(key.label)} 
            className={`${key.class} key`} 
            id={`key_${key.id}`}
        >
            {key.label}
        </li>
    ));

    return (
        <>
            <div className='keyboard'>
                <div className='screen'>
                    <h1>{sum}</h1>
                </div>
                <ul id="keyboard-numbers">
                    {listItems}
                </ul>
            </div>
        </>
    );
}

export default Keyboard;