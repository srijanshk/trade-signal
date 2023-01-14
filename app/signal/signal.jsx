"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppActions from "../../redux/actions/app";

export function SignalPage() {
  const dispatch = useDispatch();

  const signals = useSelector((state) => state.app.signals);

  useEffect(() => {
    dispatch(AppActions.getallsignalRequest());
  }, []);

  return (
    <div className="flex flex-col items-start p-6 gap-6">
      <div className="flex flex-row items-start p-0 gap-6 flex-wrap h-full">
        {signals?.map((item, index) => (
          <div
            className="flex flex-col p-4 gap-4 bg-neutral-50 rounded-md shadow w-64"
            key={index}
          >
            <div className="text-lg font-semibold text-slate-800">
              {item.signalName}
            </div>
            <div className="text-xs font-light text-slate-800">
              {item.signalDescription}
            </div>
            <div className="flex flex-col items-start p-0 gap-1.5">
              <div className="text-xs font-semibold text-slate-800">
                About the signal
              </div>
              <div className="flex flex-row items-start p-px g-px bg-cyan-100 rounded w-full justify-between">
                <div className="flex flex-col justify-center items-center p-0.5 gap-0.5 bg-cyan-50">
                  <span className="text-xs font-light text-late-800">
                    Win Rate
                  </span>
                  <span className="text-sm font-semibold text-emerald-600">
                    0%
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center p-0.5 gap-0.5 bg-cyan-50">
                  <span className="text-xs font-light text-late-800">
                    Lose Rate
                  </span>
                  <span className="text-sm font-semibold text-emerald-600">
                    0%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start p-0 gap-1.5">
              <div className="text-xs font-semibold text-slate-800">
              Subscription
              </div>
              <div className="flex flex-row items-start p-px g-px bg-orange-100 rounded w-full justify-between">
                <div className="flex flex-col justify-center items-center p-0.5 gap-0.5 bg-orange-50">
                  <span className="text-xs font-light text-late-800">
                  Subscribers
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    0
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center p-0.5 gap-0.5 bg-orange-50">
                  <span className="text-xs font-light text-late-800">
                    Price
                  </span>
                  <span className="text-sm font-semibold text-cyan-600">
                    {item.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
