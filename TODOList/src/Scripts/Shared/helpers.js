import React from "react";
import { getDefaultProject } from "../Storage/projects";


export function getExcerpt(maxLength, text) {
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength + 1) + '...';
}


export function capitalize (string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}


export function getCurrentDate () {
  return new Date().toISOString().slice(0, 10);
}


export function Input (props) {
  return <input {...props} />;
}


export function ImportantInput (props) {
  return <input {...props} required />;
}


export function Label (props, type='project') {
  return (
    <label htmlFor={`${type}-${props.name}-input`}>
      {capitalize(props.name)}
    </label>
  )
}


export function Textarea (props) {
  return <textarea {...props} />;
}

