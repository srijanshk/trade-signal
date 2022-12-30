"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export function Login() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

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
              Email address and Password donot match. Check the information and
              try again.
            </div>
          )}
          <input
            className="shadow w-80 h-14 appearance-none borde bg-neutral-100 border-neutral-200 rounded py-2 px-3 text-neutral-400 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your email address"
          />
          <div className="relative">
            <input
              className="shadow w-80 h-14 appearance-none borde bg-neutral-100 border-neutral-200 rounded py-2 px-3 text-neutral-400 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              type={show ? "password" : "text"}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              {show ? (
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
              )}
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center flex-row gap-1">
              <input
                class="rounded border-solid border-2 border-blue-700"
                type="checkbox"
              />
              <span class="text-sm">Remember Me</span>
            </div>
            <div className="text-sm font-medium text-blue-700">
              Forgot My Password
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded border border-solid border-blue-600 focus:outline-none focus:shadow-outline flex justify-between items-center"
              type="button"
            >
              <div className="text-blue-50 text-base font-medium ">Sign In</div>
              <Image src={"/icon/signin.svg"} width={20} height={20} />
            </button>
          </div>

          <div className="bg-neutral-200 rounded-t-sm rounded-r-sm rounded-l-sm h-0.5 w-full" />
          <div className="flex flex-row items-center justify-between w-full gap-5">
            <div className="text-right text-sm font-medium text-neutral-600 ">
              No account yet? No. problem
            </div>
            <button
              className="w-48 bg-blue-50 hover:bg-blue-100 py-2 px-4 rounded border border-solid border-blue-600 focus:outline-none focus:shadow-outline flex justify-between items-center"
              type="button"
            >
              <Image src={"/icon/people_plus.svg"} width={20} height={20} />
              <div className="text-blue-600 text-base font-medium ">
                Sign Up
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
