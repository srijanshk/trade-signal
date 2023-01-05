"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AppActions from "../../redux/actions/app";
import styles from "./signup.module.css";
import Input from "../../components/Input";
import Button from "../../components/Button";

export function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [show, setShow] = useState(true);
  const [confirmShow, setConfirmShow] = useState(true);
  const [error, setError] = useState(false);

  const registerError = useSelector((state) => state.app.registerError);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUp = () => {
    if (!email) return setError("Email is required");
    if (!userName) return setError("Username is required");
    if (!password) return setError("Password is required");
    if (!confirmPassword) return setError("Confirm Password is required");
    if (password !== confirmPassword)
      return setError("Password and Confirm Password Mismatched");
    if (!email && !password && !userName && !confirmPassword) return null;
    else {
      dispatch(
        AppActions.postuserregistrationRequest(
          {
            email,
            password,
            userName,
            firstName,
            lastName,
          },
          handleNavigation
        )
      );
    }
  };

  const handleNavigation = () => {
    router.push("/");
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
            <div className="text-base font-bold text-neutral-800">Sign Up</div>
            <p className="text-xs text-stone-600 ">Sign up for new account.</p>
          </div>
          {error && (
            <div className="flex flex-row items-start p-2 border border-solid border-red-100 bg-red-50 w-full font-normal text-base text-red-800">
              {error}
            </div>
          )}
          {registerError && (
            <div className="flex flex-row items-start p-2 border border-solid border-red-100 bg-red-50 w-full font-normal text-base text-red-800">
              {registerError}
            </div>
          )}

          <div className="flex flex-row items-start gap-4">
            <Input
              value={email}
              width="w-72"
              type="text"
              placeholder="Email address"
              onChange={(e) => setEmail(e)}
            />
            <Input
              value={userName}
              width="w-72"
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e)}
            />
          </div>
          <div className="flex flex-row items-start gap-4">
            <Input
              placeholder="Password"
              width="w-72"
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
            <Input
              placeholder="Confirm Password"
              type={confirmShow ? "password" : "text"}
              width="w-72"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e)}
              postIcon={
                !confirmShow ? (
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
          </div>
          <div className="flex flex-row items-center p-2 gap-2 w-full">
            <div className="bg-neutral-200 rounded-t-sm rounded-r-sm rounded-l-sm h-0.5 w-52" />
            <div className="text-sm font-medium text-neutral-400">
              Personal Information
            </div>
            <div className="bg-neutral-200 rounded-t-sm rounded-r-sm rounded-l-sm h-0.5 w-52" />
          </div>

          <div className="flex flex-row items-start gap-4">
            <Input
              value={firstName}
              width="w-72"
              type="text"
              placeholder="First name"
              onChange={(e) => setFirstName(e)}
            />
            <Input
              value={lastName}
              width="w-72"
              type="text"
              placeholder="Last name"
              onChange={(e) => setLastName(e)}
            />
          </div>

          <div className="flex items-center justify-between w-full">
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
              onClick={handleSignUp}
            />
          </div>

          <div className="bg-neutral-200 rounded-t-sm rounded-r-sm rounded-l-sm h-0.5 w-full" />
          <div className="flex flex-row items-center justify-end w-full gap-5">
            <div className="text-right text-sm font-medium text-neutral-600 ">
              Already have an account?
            </div>
            <Button
              name="Sign In"
              color="bg-blue-600 hover:bg-blue-700"
              ringSize="rounded"
              size="w-48"
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
              onClick={() => router.push("/")}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
