import React, { TextareaHTMLAttributes, useEffect, useRef, useState } from 'react';

interface props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AutoGrowTextField: React.FC<props> = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState('');
    const [textAreaHeight, setTextAreaHeight] = useState('auto');

    useEffect(() => {
        setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`);
    }, [text]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaHeight('auto');
        setText(e.target.value);

        if (props.onChange) {
            props.onChange(e);
        }
    };

    return (
        <textarea
            {...props}
            className='growingTextInput'
            ref={textAreaRef}
            rows={1}
            style={{
                height: textAreaHeight,
            }}
            onChange={onChangeHandler}
        />
    );
};

export default AutoGrowTextField;
