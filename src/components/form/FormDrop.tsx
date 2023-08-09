import React from "react";
import { Label } from "@/components/ui/label";
// Import the useDropzone hooks from react-dropzone
// @ts-ignore
import { useDropzone } from "react-dropzone";

export type Props = {
  label?: string | undefined;
  onDrop: (acceptedFiles: File[]) => void;
  accept?: any | undefined;
}

export const FormDrop = ({ onDrop, accept, label }: Props) => {
  // Initializing useDropzone hooks with options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept
  });

  /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */

  return (
    <div className="dropzone-div" {...getRootProps()}>
      <Label>{label}</Label>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Release to drop the files here</p>
        ) : (
          <p className="dropzone-content">
            Drop an HTML file here
          </p>
        )}
      </div>
    </div>
  );
};
