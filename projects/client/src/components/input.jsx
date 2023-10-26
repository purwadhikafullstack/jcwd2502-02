import { forwardRef } from "react";
import React from "react";

const Input = React.forwardRef((props, ref) => {
    return (
        <div>
            <input
                ref={ref}
                type={props.type}
                placeholder={props.placeholder}
                className={props.style}
                onChange={props.onChange}
                value={props.value}
            />
        </div>
    );
});

export default Input;
