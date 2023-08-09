import React, { ChangeEvent, useCallback, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FormButton } from "../components/form/FormButton";
import { FormInput } from "../components/form/FormInput";
import { FormDrop } from "../components/form/FormDrop";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function Home() {
  const [html, setHtml] = useState("");
  const [isSendDisabled, _setIsSendDisabled] = useState(true);
  const [error, setError] = useState("");
  const [didEmailSend, setDidEmailSend] = useState(false);
  const emailRef = useRef<string>("");

  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target?.value || "";
    emailRef.current = email;
    // TODO: validate email
    setIsSendDisabled(email, html);
  }, []);

  const setIsSendDisabled = useCallback((email: string, html: string) => {
    if (email === "" || html === "") {
      _setIsSendDisabled(true);
    } else {
      _setIsSendDisabled(false);
    }
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError("");
    console.log(acceptedFiles);
    const file = acceptedFiles[0];
    if (!file) {
      setError("Invalid file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      console.log(event);
      if (typeof event.target?.result !== "string") {
        setError("Unable to open HTML file");
        return;
      }
      setHtml(event.target.result);
      setIsSendDisabled(emailRef.current, event.target.result);
    }
    reader.readAsText(file);
  }, []);

  const onSendEmailClick =  useCallback(async () => {
    setDidEmailSend(false);
    setError("");
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/email`;
    const data = {
      email: emailRef.current,
      html
    };
    console.log("data", data);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; encoding=utf-8',
        'Accept': 'application/json; encoding=utf-8',
      },
      body: JSON.stringify(data)
    });
    if (!response) {
      setError("Unable to reach API server");
      return;
    }
    if (response.status === 500) {
      setError("Server error");
      return;
    }
    const responseJson = await response.json();
    if (responseJson.status === "error") {
      setError("Error processing request");
      return;
    }
    console.log(responseJson);
    if (responseJson.status === "success") {
      setDidEmailSend(true);
    } else {
      setError(`Unknown error: ${responseJson.message}`);
    }
  }, []);

  return (
    <div>
      {error && (
      <Alert>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
      )}
      {didEmailSend && (
      <Alert>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>The email was sent</AlertDescription>
      </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Send HTML Email</CardTitle>
        </CardHeader>
        <CardContent>
          <FormInput
            label="Recipient"
            type="email"
            placeholder="email@example.com"
            onChange={onEmailChange}
          />
          <FormDrop label="Drop HTML File" onDrop={onDrop} accept={"text/html"} />
        </CardContent>
        <CardFooter>
          <FormButton disabled={isSendDisabled} onClick={onSendEmailClick}>Send Email</FormButton>
        </CardFooter>
      </Card>
      
      {html && (
        <Card>
          <CardContent>
            <div dangerouslySetInnerHTML={{__html: html}} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}