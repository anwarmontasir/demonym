import React from 'react';
import './demonym.css';

export default function Demonym(props) {

    const firstWord = ['a', 'e', 'i', 'o', 'u'].indexOf(props.name[0].toLowerCase()) !== -1 ? 'An' : 'A';

    return(
        <div className="demonym">
            {firstWord} {props.name} comes from {props.country}
        </div>
    )
}