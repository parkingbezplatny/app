import { useMutation } from "@tanstack/react-query";
import agent from "../api/agent";
import { TSignUpForm } from "../types";

function signUp(signUpForm: TSignUpForm) {
  return agent.Auth.signUpWithCredentials(signUpForm);
}

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};
