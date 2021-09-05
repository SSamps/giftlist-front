import React, { TextareaHTMLAttributes, useEffect, useRef, useState } from 'react';

interface props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement> | any) => void;
}

const AutoGrowTextField: React.FC<props> = ({ value, onChange, ...rest }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [textAreaHeight, setTextAreaHeight] = useState('auto');

    useEffect(() => {
        if (value === '') {
            setTextAreaHeight('auto');
        } else {
            setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`);
        }
    }, [value]);

    const onChangeInternal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaHeight('auto');
        onChange(e);
    };

    return (
        <textarea
            {...rest}
            value={value}
            onChange={onChangeInternal}
            className='growingTextInput'
            ref={textAreaRef}
            rows={1}
            style={{
                height: textAreaHeight,
            }}
        />
    );
};

export default AutoGrowTextField;
