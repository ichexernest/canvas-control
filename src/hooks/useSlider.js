import React, { useState, useEffect, useRef } from 'react';

export const useSlider = (min, max, defaultState, label, id) => {
    const [state, setSlide] = useState(defaultState);
    const handleChange = e => {
        console.log('setting level', e.target.value)
        setSlide(e.target.value);
    };

    const Slider = () => (
        <input
            type="range"
            id={id}
            min={min}
            max={max}
            step={0.5}
            // value={state} // don't set value from state
            defaultValue={state} // but instead pass state value as default value
            onChange={e => console.log(e.target.value)} // don't set state on all change as react will re-render
            onMouseUp={handleChange} // only set state when handle is released
        />
    );
    return [state, Slider, setSlide];
};