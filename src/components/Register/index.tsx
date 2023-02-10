import React, { useRef, useState, useEffect, FormEvent } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import {
  PASSWORD_REGEX,
  USERNAME_REGEX,
  EMAIL_REGEX,
} from "../../utils/validation";
import { ErrorMessage, InlineLabel, StyledForm, StyledWrapper } from "./styles";

import NoteMessage from "../NoteMessage";
import { Input } from "@mui/material";
import axios from "../../api/axios";
import ButtonComponent from "../ButtonComponent";
import SuccessComponent from "../SuccessComponent";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [idNumber, setIdNumber] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const userRef = useRef<HTMLInputElement>();
  const errRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);

    setValidEmail(() => result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(pwd);

    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PASSWORD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        `/api/register`,
        JSON.stringify({
          name: name,
          surname: surname,
          email: email,
          password: pwd,
          idNumber: idNumber,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSuccess(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 409) {
        setErrMsg("Email Already Exists");
      } else {
        setErrMsg("Registraiotn Failed");
      }
      errRef.current?.focus();
    }
  };

  return (
    <StyledWrapper flexDirection="column">
      {success ? (
        <SuccessComponent
          message={"You have successfully registered"}
          action="Click here to Sign In"
        />
      ) : (
        <StyledWrapper flexDirection="column" className="registration">
          <ErrorMessage
            ref={errRef}
            displayMsg={errMsg ? "none" : "block"}
            aria-live="assertive"
          >
            <p>Registration Form</p>
            <StyledForm action="" onSubmit={handleSubmit}>
              {/* Name */}
              <InlineLabel htmlFor="name">Name:</InlineLabel>
              <Input
                type="text"
                id="name"
                ref={userRef}
                onChange={(e) => setName(e.target.value)}
                required
              />

              {/* Surname */}
              <InlineLabel htmlFor="surname">Surname:</InlineLabel>
              <Input
                type="text"
                id="surname"
                ref={userRef}
                onChange={(e) => setSurname(e.target.value)}
                required
              />

              {/* ID Number */}
              <InlineLabel htmlFor="email">ID Number:</InlineLabel>
              <Input
                type="number"
                id="idNumber"
                ref={userRef}
                onChange={(e) => setIdNumber(e.target.value)}
                inputProps={{ minLength: 2, maxLength: 13 }}
                required
              />

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
              <InlineLabel htmlFor="password">
                Password:
                <NoteMessage displayMsg={validPwd ? "inline-flex" : "none"}>
                  <CheckCircleIcon />
                </NoteMessage>
                <NoteMessage
                  displayMsg={validPwd || !pwd ? "none" : "inline-flex"}
                >
                  <ClearIcon />
                </NoteMessage>
              </InlineLabel>
              <Input
                type="password"
                id="password"
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onChange={(e) => setPwd(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                required
              />
              <NoteMessage
                id="pwdnote"
                displayMsg={pwdFocus && !validPwd ? "block" : "none"}
              >
                <InfoIcon fontSize="large" />
                8 to 24 characters.
                <br />
                Muse include uppercase and lowercase, a number and a special
                character
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hash symbol">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percentage symbol">%</span>
              </NoteMessage>

              {/* confirm password */}
              <InlineLabel htmlFor="confirm_pwd">
                Confirm Password:
                <NoteMessage
                  displayMsg={validMatch && matchPwd ? "inline-flex" : "none"}
                >
                  <CheckCircleIcon />
                </NoteMessage>
                <NoteMessage
                  displayMsg={validMatch || !matchPwd ? "none" : "inline-flex"}
                >
                  <ClearIcon />
                </NoteMessage>
              </InlineLabel>
              <Input
                type="password"
                id="confirm_pwd"
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="confirmnote"
                onChange={(e) => setMatchPwd(e.target.value)}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                required
              />
              <NoteMessage
                id="confirmnote"
                displayMsg={matchFocus && !validMatch ? "block" : "none"}
              >
                <InfoIcon fontSize="large" />
                Must match the password
              </NoteMessage>

              <ButtonComponent
                $background={
                  !validEmail || !validPwd || !validMatch
                    ? "lightgray"
                    : "green"
                }
                $color={
                  !validEmail || !validPwd || !validMatch ? "black" : "white"
                }
                disabled={
                  !validEmail || !validPwd || !validMatch ? true : false
                }
              >
                Register
              </ButtonComponent>
            </StyledForm>
            <p>
              Already registered? <br />
              <span>
                <a href="/login">Sign in</a>
              </span>
            </p>
            {errMsg}
          </ErrorMessage>
        </StyledWrapper>
      )}
    </StyledWrapper>
  );
};

export default Register;
