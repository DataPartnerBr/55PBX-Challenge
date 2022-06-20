import React, {useEffect, useState} from 'react'
import Images from './Images'
import '../index.css';

export default function App() {
    const [submitting, setSubmitting] = useState(false);
    const [values, setValues] = useState({
        url: ''
    });
    const set = url => {
        return ({target: {value}}) => {
            setValues(oldValues => ({...oldValues, [url]: value}));
        }
    };

    const saveFormData = async () => {
        const uri = 'http://localhost:5000/api/v1/images'
        const response = await fetch(uri, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status !== 200) {
            throw new Error(`Request failed: ${response.status}`);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await saveFormData();
            setSubmitting(true);
            setValues({
                url: ''
            });

            setTimeout(() => {
                setSubmitting(false);
            }, 3000);


        } catch (e) {
            alert(`Ocorreu algum erro! ${e.message}`);
        }
    };

    return (
        <div className='app'>
            <div className="wrapper">
                <h1>Obter imagens da URL</h1>
                {submitting &&
                <div>Enviando solicitação....</div>
                }
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <label>
                            <p>URL</p>
                            <input type="text" required
                                   value={values.url} onChange={set('url')} placeholder="http://datapartner.com.br"/>
                        </label>
                        <button type="submit">Enviar</button>
                    </fieldset>
                </form>
            </div>
            <Images/>
        </div>
    )
}
