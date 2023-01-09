"use client";

import classNames from "classnames";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { Dialog, Transition } from "@headlessui/react";
import CreateSignal from "../Modal/CreateSignal";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const active = usePathname();
  const cancelButtonRef = useRef(null);

  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [showSignalDialog, setShowSignal] = useState(false);

  return (
    <div
      className="flex flex-row items-start p-0 gap-px relative bg-neutral-300"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      {show && (
        <aside
          className="flex flex-col items-start p-0 gap-px w-56 linear-background"
          style={{ minHeight: "100vh" }}
        >
          <Image src="/logo-blue.svg" width={222} height={72} alt="logo" />
          <div className="flex flex-col items-start p-2.5 gap-2.5 w-full cursor-pointer">
            <div
              className={classNames(
                "flex flex-row items-start py-2 px-6 gap-2 rounded-lg h-9 text-neutral-300 text-sm font-bold hover:bg-blue-700 w-full",
                active.includes("dashboard") && "bg-blue-700"
              )}
              onClick={() => router.push("/dashboard")}
            >
              <Image
                src="/icon/dashboard-icon.svg"
                width={20}
                height={20}
                alt="logo"
              />
              Dashboard
            </div>
            <div
              className={classNames(
                "flex flex-row items-start py-2 px-6 gap-2 rounded-lg h-9 text-neutral-300 text-sm font-bold hover:bg-blue-700 w-full",
                active.includes("signal") && "bg-blue-700"
              )}
              onClick={() => router.push("/signal")}
            >
              <Image
                src="/icon/dashboard-icon.svg"
                width={20}
                height={20}
                alt="logo"
              />
              Signals
            </div>
            <div
              className={classNames(
                "flex flex-row items-start py-2 px-6 gap-2 rounded-lg h-9 text-neutral-300 text-sm font-bold hover:bg-blue-700 w-full",
                active.includes("program") && "bg-blue-700"
              )}
              onClick={() => router.push("/programs")}
            >
              <Image
                src="/icon/dashboard-icon.svg"
                width={20}
                height={20}
                alt="logo"
              />
              Programs
            </div>
            <div
              className={classNames(
                "flex flex-row items-start py-2 px-6 gap-2 rounded-lg h-9 text-neutral-300 text-sm font-bold hover:bg-blue-700 w-full",
                active.includes("my-account") && "bg-blue-700"
              )}
              onClick={() => router.push("/my-account")}
            >
              <Image
                src="/icon/dashboard-icon.svg"
                width={20}
                height={20}
                alt="logo"
              />
              My accounts
            </div>
          </div>
        </aside>
      )}
      <div className="flex flex-col items-start p-0 gap-px w-full h-screen">
        <header className="flex flex-row items-center justify-between px-7 py-5 w-full bg-neutral-100 ">
          <div className="flex flex-row items-center p-0 gap-4">
            <button
              onClick={() => setShow(!show)}
              className="flex flex-row items-start p-1.5 gap-1 bg-neutral-100 border border-solid border-neutral-200 rounded text-xs font-normal text-neutral-400"
            >
              <Image
                src="/icon/sidebar.svg"
                width={16}
                height={16}
                alt="logo"
              />
              sidebar
            </button>
            <div className="box-border flex flex-row items-center py-1 px-3 gap-4 bg-cyan-50 border border-solid border-cyan-200 rounded">
              <div className="flex flex-row items-center p-0 gap-0.5">
                <div className="text-sm font-light text-cyan-900">
                  Followers
                </div>
                <div className="text-sm font-bold text-cyan-600">145K</div>
              </div>
              <div className="flex flex-row items-center p-0 gap-0.5">
                <div className="text-sm font-light text-cyan-900">
                  Following
                </div>
                <div className="text-sm font-bold text-cyan-600">145K</div>
              </div>
              <div className="flex flex-row items-center p-0 gap-0.5">
                <div className="text-sm font-light text-cyan-900">Signals</div>
                <div className="text-sm font-bold text-cyan-600">12</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center p-0 gap-6">
            <div className="flex flex-row items-start p-0 gap-1">
              <Input
                value={search}
                width="w-48"
                placeholder="search"
                border="border border-solid border-neutral-200"
                ringSize="rounded-lg"
                height="h-7"
                margin=""
                preIcon={
                  <Image
                    src="/icon/circle-profile.svg"
                    width={20}
                    height={20}
                    alt="logo"
                  />
                }
                onChange={(e) => setSearch(e)}
              />
              <div className="box-border flex flex-row flex-start p-1.5 gap-1 bg-blue-50 border border-solid border-blue-600 cursor-pointer">
                <Image
                  src="/icon/search.svg"
                  width={13}
                  height={13}
                  alt="logo"
                />
              </div>
            </div>
            <Button
              name="Create signal"
              padding="p-1.5 gap-1"
              color="bg-blue-600 hover:bg-blue-700"
              size="h-7"
              textStyle="text-xs font-regular text-blue-50"
              preIcon={
                <Image src="/icon/plus.svg" width={12} height={12} alt="logo" />
              }
              onClick={() => setShowSignal(true)}
            />

            <div className="flex flex-row items-start p-0 gap-2">
              <div className="box-border flex flex-row flex-start p-1.5 gap-1 bg-neutral-100 rounded border border-solid border-neutral-200 cursor-pointer h-7 w-7">
                <Image
                  src="/icon/brigthness.svg"
                  width={15}
                  height={15}
                  alt="logo"
                />
              </div>
              <div className="box-border flex flex-row flex-start p-1.5 gap-1 bg-neutral-100 rounded border border-solid border-neutral-200 cursor-pointer h-7 w-7">
                <Image
                  src="/icon/time.svg"
                  width={12.52}
                  height={11.96}
                  alt="logo"
                />
              </div>
              <div className="box-border flex flex-row flex-start p-1.5 gap-1 bg-neutral-100 rounded border border-solid border-neutral-200 cursor-pointer h-7 w-7">
                <Image
                  src="/icon/notification.svg"
                  width={11.87}
                  height={13.5}
                  alt="logo"
                />
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-col items-start p-6 gap-6 overflow-y-scroll bg-neutral-100 flex-grow w-full h-full">
          {children}
        </div>
        <CreateSignal modal={showSignalDialog} onClose={e => setShowSignal(e)} />
      </div>
    </div>
  );
}
