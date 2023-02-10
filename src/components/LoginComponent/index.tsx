import { Input } from "@mui/material";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import ButtonComponent from "../ButtonComponent";
import NoteMessage from "../NoteMessage";
import {
  StyledWrapper,
  ErrorMessage,
  StyledForm,
  InlineLabel,
} from "../Register/styles";
import SuccessComponent from "../SuccessComponent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import { EMAIL_REGEX } from "../../utils/validation";
import axios from "../../api/axios";
import ErrorComponent from "../ErrorComponent";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [responseErr, setResponseErr] = useState(false);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);

    setValidEmail(() => result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const userRef = useRef<HTMLInputElement>();
  const errRef = useRef<HTMLParagraphElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);

    if (!v1 || !pwd) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        `/api/auth`,
        JSON.stringify({ email: email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSuccess(true);
    } catch (err: any) {
      setResponseErr(true);
      setErrMsg(err.response.data.msg);

      errRef.current?.focus();
    }
  };

  return (
    <StyledWrapper flexDirection="column">
      {success ? (
        <SuccessComponent message="You have successfully signed in!" />
      ) : responseErr ? (
        <ErrorComponent message={errMsg} />
      ) : (
        <StyledWrapper flexDirection="column" className="registration">
          <ErrorMessage
            ref={errRef}
            displayMsg={errMsg ? "none" : "block"}
            aria-live="assertive"
          >
            <p>Login</p>
            <StyledForm action="" onSubmit={handleSubmit}>
              {/* Email */}
              <InlineLabel htmlFor="email">
                Email:
                <NoteMessage displayMsg={validEmail ? "inline-flex" : "none"}>
                  <CheckCircleIcon />
                </NoteMessage>
                <NoteMessage
                  displayMsg={validEmail || !email ? "none" : "inline-flex"}
                >
                  <ClearIcon />
                </NoteMessage>
              </InlineLabel>
              <Input
                type="text"
                id="email"
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                ref={userRef}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                required
              />
              <NoteMessage
                id="emailnote"
                displayMsg={
                  emailFocus && email && !validEmail ? "inline-flex" : "none"
                }
              >
                <InfoIcon fontSize="medium" />
                Must be a valid email
              </NoteMessage>
              {/* password */}
              <InlineLabel htmlFor="password">Password:</InlineLabel>
              <Input
                type="password"
                id="password"
                aria-describedby="pwdnote"
                onChange={(e) => setPwd(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                required
              />

              <ButtonComponent
                $background={!validEmail ? "lightgray" : "green"}
                $color={!validEmail ? "black" : "white"}
                disabled={!validEmail ? true : false}
              >
                Sign In
              </ButtonComponent>
            </StyledForm>

            {errMsg}
          </ErrorMessage>
        </StyledWrapper>
      )}
    </StyledWrapper>
  );
};

export default LoginComponent;
