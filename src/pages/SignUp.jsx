import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SignUp() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    Pw: "",
  });

  

  const [disable, setDisable] = useState(false);

  const { email, Pw } = inputs;

  const onChange = (e) => {
    
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };


  const onReset = () => {
    const isValidEmail = inputs.email.includes("@") && email.includes(".");
    const isValidPassword = inputs.Pw.length >= 8 && inputs.Pw.length >= 1;

    if (isValidEmail && isValidPassword) {
      fetch("https://www.pre-onboarding-selection-task.shop/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputs.email,
          password: String(inputs.Pw),
        }),
      }).then((response) => {
        console.log(response);
        if (response.status === 201) {
          navigate("/signin");
          alert("가입완료")
        }
      });
      setInputs({ email: "", Pw: "" });
    } else {
      alert("이메일은 @포함, 비밀번호는 8자 이상")
      setDisable(true);
    }
  };


  return (
    <>
      <Container>
        <div>
          <input
            name="email"
            placeholder="이메일"
            onChange={onChange}
            value={email}
            data-testid="email-input"
          />
        </div>
        <div>
          <input
            type="password"
            name="Pw"
            placeholder="비밀번호"
            onChange={onChange}
            value={Pw}
            data-testid="password-input"
          />
        </div>
        <button
          onClick={onReset}
          data-testid="signup-button"
          disabled={disable}
          variant="success"
        >
          회원가입
        </button>
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
export default SignUp;
