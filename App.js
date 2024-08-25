import React, { useState } from 'react';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            const res = await fetch('https://bajaj-igtn7am66-samriddhi14s-projects.vercel.app/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: parsedData.data }),
            });
            const result = await res.json();
            setResponse(result);
        } catch (error) {
            alert('Invalid JSON input!');
        }
    };

    const handleOptionChange = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedOptions(value);
    };

    return (
        <div className="App">
            <h1>{response?.roll_number || "Your Roll Number"}</h1>
            <textarea
                rows="5"
                cols="50"
                placeholder='Enter JSON like {"data": ["A","b","3"]}'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>

            {response && (
                <>
                    <select multiple={true} onChange={handleOptionChange}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>
                    <div>
                        {selectedOptions.includes('alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                        {selectedOptions.includes('numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
                        {selectedOptions.includes('highest_lowercase_alphabet') && (
                            <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
