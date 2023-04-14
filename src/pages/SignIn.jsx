import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SignIn() {
  const navigate = useNavigate();
  let [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(false);
  const { email, password } = inputValue;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const nextPageHandler = () => {
    const isValidEmail =
      inputValue.email.includes("@") && inputValue.email.includes(".");
    const isValidPassword =
      inputValue.password.length >= 8 && inputValue.password.length >= 1;

    if (isValidEmail && isValidPassword) {
      fetch("https://www.pre-onboarding-selection-task.shop/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputValue.email,
          password: String(inputValue.password),
        }),
      }).then(
        (response) => {
          if (response.status == 200) {
            setInputValue({ email: "", password: "" });
            response.json().then((response) => {
              localStorage.setItem("access_token", response.access_token);
              alert("로그인완료")
              navigate("/todos");
              
            });
          }
        }
      );
    } else {
      alert("이메일은 @포함, 비밀번호는 8자 이상")
      setDisable(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      navigate("/todos");
    }
  }, []);


  return (
    <>
      <Container>
        <div>
        <input data-testid="email-input" name="email" type="email" onChange={onChange} value={email} placeholder="이메일"/>
        </div>
        <div>
        <input
        data-testid="password-input"
          placeholder="비밀번호"
          name="password"
          type="password"
          onChange={onChange}
          value={password}
        />
        </div>
        <button data-testid="signin-button"  disabled={disable} onClick={nextPageHandler}>로그인</button>
        </Container>
    </>
  );
}

const Container = styled.div`

  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-direction: column;
  div {
    margin-bottom: 1rem;
  }
  button {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background-color: white;
    color: black;
    border: none;
    cursor: pointer;
    width:300px;
    height:50px;
  }
  input{
    width:300px;
    height:50px;
    fontSize:60px;
  }
`;

export default SignIn;
