import { useMutation } from "@tanstack/react-query";
import agent from "../api/agent";
import { TUpdateUserPassword, TUpdateUserUsername } from "../types";

export type TUseUpdateUsernameProps = {
    email: string;
  } & TUpdateUserUsername

function updateUsername({ email, username }: TUseUpdateUsernameProps) {
    return agent.Users.updateUsernameByEmail(email, {
      username: username,
    });
  }

export const useUpdateUsername = (onSuccess: () => void) => {
    return useMutation({
        mutationFn: updateUsername,
        onSuccess: onSuccess,
      });
}

export type TUseUpdatePasswordProps = {
    email: string;
  } & TUpdateUserPassword;

function updatePassword({ email, passwords }: TUseUpdatePasswordProps) {
    return agent.Users.updatePasswordByEmail(email, {passwords});
  }

export const useUpdatePassword = (onSuccess: () => void) => {
    return useMutation({
        mutationFn: updatePassword,
        onSuccess: onSuccess,
      });
}
