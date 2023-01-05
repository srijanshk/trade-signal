"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { isNull } from "lodash";
import Input from "../components/Input";
import Button from "../components/Button";
import { validateEmail } from "../utils/utils";
import AppActions from "../redux/actions/app";
import styles from "./page.module.css";

export function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [show, setShow] = useState(true);
  const [error, setError] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");

  const token = useSelector((state) => state.app.token);
  const user = useSelector((state) => state.app.user);
  const loginError = useSelector((state) => state.app.loginError);

  if (token && !isNull(user)) return router.push("/dashboard");

  const handleEmail = (e) => {
    if (validateEmail(e)) {
      setEmail(e);
      setError("");
    } else setError("Invalid Email format eg. test@gmail.com");
  };

  const handleLogin = () => {
    if (!email) return setError("Email is required");
    if (!password) return setError("Password is required");
    if (!email && !password) return null;
    if (email && password) {
      dispatch(
        AppActions.postloginRequest(
          {
            email: email,
            password,
          },
          handleNavigation
        )
      );
    }
  };

  const handleNavigation = () => {
    router.push("/dashboard");
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(/bg/auth-bg.png)`,
      }}
    >
      <div className={styles.layout}>
        <form className={styles.form}>
          <div className={styles.form_logo}>
            <Image src="/logo-holder.png" width={222} height={72} alt="logo" />
          </div>
          <div className={styles.form_header}>
            <div className="text-base font-bold text-neutral-800">Sign In</div>
            <p className="text-xs text-stone-600 ">
              Sign in to continue with your account.
            </p>
          </div>
          {error && (
            <div className="flex flex-row items-start p-2 border border-solid border-red-100 bg-red-50 w-full font-normal text-base text-red-800">
              {error}
            </div>
          )}
          {loginError && (
            <div className="flex flex-row items-start p-2 border border-solid border-red-100 bg-red-50 w-full font-normal text-base text-red-800">
              {loginError}
            </div>
          )}
          <Input
            value={email}
            type="text"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e)}
          />
          <Input
            placeholder="Enter your password"
            type={show ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e)}
            postIcon={
              !show ? (
                <Image
                  src="/icon/eye.svg"
                  className="cursor-pointer mb-2"
                  width={18.75}
                  height={12.5}
                  alt="Picture of the eye"
                  color="#F9F9F9"
                  onClick={() => setShow(!show)}
                />
              ) : (
                <Image
                  src="/icon/eye-slash.svg"
                  className="cursor-pointer mb-2"
                  width={18.75}
                  height={12.5}
                  alt="Picture of the eye with slash"
                  color="#F9F9F9"
                  onClick={() => setShow(!show)}
                />
              )
            }
          />
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center flex-row gap-1">
              <input
                className="rounded border-solid border-2 border-blue-700"
                type="checkbox"
              />
              <span className="text-sm">Remember Me</span>
            </div>
            <div className="text-sm font-medium text-blue-700">
              Forgot My Password
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <Button
              name="Sign In"
              color="bg-blue-600 hover:bg-blue-700"
              ringSize="rounded"
              size="w-full"
              border="border border-solid border-blue-600"
              textStyle="text-blue-50 text-base font-medium"
              postIcon={
                <Image
                  src={"/icon/signin.svg"}
                  width={20}
                  height={20}
                  alt="icon"
                />
              }
              onClick={handleLogin}
            />
          </div>

          <div className="bg-neutral-200 rounded-t-sm rounded-r-sm rounded-l-sm h-0.5 w-full" />
          <div className="flex flex-row items-center justify-between w-full gap-5">
            <div className="text-right text-sm font-medium text-neutral-600 ">
              No account yet? No. problem
            </div>
            <Button
              name="Sign Up"
              color="bg-blue-50 hover:bg-blue-100"
              ringSize="rounded"
              size="w-48"
              border="border border-solid border-blue-600"
              textStyle="text-blue-600 text-base font-medium"
              preIcon={
                <Image
                  src={"/icon/people_plus.svg"}
                  width={20}
                  height={20}
                  alt="logo"
                />
              }
              onClick={() => router.push('/signup')}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
