"use client";
import TextareaAutosize from "react-textarea-autosize";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ name, onBlur, onChange, value, className }, ref) => {
		return (
			<TextareaAutosize
				onBlur={onBlur}
				onChange={onChange}
				value={value}
				name={name}
				ref={ref}
				className={twMerge(
					"bg-transparent w-full h-24 p-4 text-lg outline-0",
					className
				)}
			/>
		);
	}
);
TextArea.displayName = "TextArea";

export {TextArea}