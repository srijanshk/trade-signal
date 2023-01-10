import { Fragment, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { useEffect } from "react";
import Image from "next/image";
import Input from "../../Input";
import Button from "../../Button";
import AppActions from "../../../redux/actions/app";

const CreateSignal = ({ modal = false, onClose = () => {} }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(modal);
  const cancelButtonRef = useRef(null);

  const [actionType, setActionType] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [privacy, setPrivacy] = useState(null);
  const [signalName, setSignalName] = useState("");
  const [signalDescription, setSignalDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [ticker, setTicker] = useState("");
  const [stopLoss, setStopLoss] = useState(0);
  const [takeProfit, setTakeProfit] = useState(0);

  const actionTypes = [
    { id: 1, name: "Open", value: "open" },
    { id: 2, name: "Close", value: "close" },
  ];

  const orderTypes = [
    { id: 1, name: "Buy", value: "buy" },
    { id: 2, name: "Sell", value: "sell" },
  ];

  const privacyType = [
    { id: 1, name: "Private", value: "private" },
    { id: 2, name: "Public", value: "public" },
    { id: 3, name: "Followers", value: "followers" },
  ];

  useEffect(() => {
    setIsOpen(modal);
  }, [modal]);

  const handleClose = () => {
    setIsOpen(false);
    onClose(false);
  };

  const handleSubmit = () => {
    const payload = {
      signalName,
      signalDescription,
      ticker,
      stopLoss: parseInt(stopLoss),
      takeProfit: parseInt(takeProfit),
      price: parseInt(price),
      privacy: privacy.value,
      orderType: orderType.value,
      actionType: actionType.value,
      meta: "{}"
    };
    dispatch(AppActions.createsignalRequest(payload, handleClose));
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative" open={isOpen} onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start w-full">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full gap-4">
                      <div className="flex flex-row items-center p-0 gap-4 justify-between">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-semibold text-neutral-800"
                        >
                          Create Signal
                        </Dialog.Title>
                        <div
                          className="flex flex-row items-center justify-center hover:bg-red-50 cursor-pointer h-7 w-7"
                          onClick={handleClose}
                          ref={cancelButtonRef}
                        >
                          <Image
                            src="/icon/close.svg"
                            width={11.25}
                            height={11.25}
                            alt="logo"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 mt-4 w-full">
                        <div className="flex flex-row items-start gap-2.5 w-full">
                          <Input
                            placeholder="Signal Name"
                            width="w-full"
                            title="Signal Name"
                            value={signalName}
                            onChange={(e) => setSignalName(e)}
                          />
                        </div>
                        <div className="flex flex-row items-start gap-2.5 w-full">
                          <Input
                            placeholder="Signal Description"
                            width="w-full"
                            title="Signal Description"
                            as="textarea"
                            rows="4"
                            value={signalDescription}
                            onChange={(e) => setSignalDescription(e)}
                          />
                        </div>
                        <div className="flex flex-row items-start gap-2.5 w-full">
                          <Input
                            placeholder="Tricker"
                            title="Tricker"
                            width="w-full"
                            value={ticker}
                            onChange={(e) => setTicker(e)}
                          />
                        </div>
                        <div className="flex flex-row items-start gap-8 w-full">
                          <Input
                            placeholder="Price"
                            title="Subscription Price"
                            type="number"
                            width="w-72"
                            min={0}
                            value={price}
                            onChange={(e) => setPrice(e)}
                          />
                          <div className="flex flex-col">
                            <Listbox
                              value={privacy}
                              onChange={(e) => setPrivacy(e)}
                            >
                              <Listbox.Label className="text-sm font-semibold text-neutral-600 mb-1">
                                Privacy
                              </Listbox.Label>
                              <div className="relative mt-1">
                                <Listbox.Button className="h-14 w-72 relative cursor-default rounded border border-solid border-neutral-200 bg-neutral-100 py-2 pl-3 pr-10 text-left shadow-smfocus:outline-none focus:ring-1sm:text-sm">
                                  <span className="flex items-center">
                                    <span className="ml-3 block truncate text-neutral-400">
                                      {privacy?.name || "Select"}
                                    </span>
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <Image
                                      src="/icon/down-icon.svg"
                                      width={13.75}
                                      height={7.5}
                                      alt="icon"
                                    />
                                  </span>
                                </Listbox.Button>
                                <Transition
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {privacyType.map((item, index) => (
                                      <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                              ? "bg-amber-100 text-amber-900"
                                              : "text-gray-900"
                                          }`
                                        }
                                        value={item}
                                      >
                                        {({ selected }) => (
                                          <>
                                            <span
                                              className={`block truncate ${
                                                selected
                                                  ? "font-medium"
                                                  : "font-normal"
                                              }`}
                                            >
                                              {item.name}
                                            </span>
                                            {selected ? (
                                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </Listbox>
                          </div>
                        </div>
                        <div className="flex flex-row items-start gap-8 w-full">
                          <div className="flex flex-col">
                            <Listbox
                              value={actionType}
                              onChange={(e) => setActionType(e)}
                            >
                              <Listbox.Label className="text-sm font-semibold text-neutral-600 mb-1">
                                Action Type
                              </Listbox.Label>
                              <div className="relative mt-1">
                                <Listbox.Button className="h-14 w-72 relative cursor-default rounded border border-solid border-neutral-200 bg-neutral-100 py-2 pl-3 pr-10 text-left shadow-smfocus:outline-none focus:ring-1sm:text-sm">
                                  <span className="flex items-center">
                                    <span className="ml-3 block truncate text-neutral-400">
                                      {actionType?.name || "Select"}
                                    </span>
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <Image
                                      src="/icon/down-icon.svg"
                                      width={13.75}
                                      height={7.5}
                                      alt="icon"
                                    />
                                  </span>
                                </Listbox.Button>
                                <Transition
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {actionTypes.map((item, index) => (
                                      <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                              ? "bg-amber-100 text-amber-900"
                                              : "text-gray-900"
                                          }`
                                        }
                                        value={item}
                                      >
                                        {({ selected }) => (
                                          <>
                                            <span
                                              className={`block truncate ${
                                                selected
                                                  ? "font-medium"
                                                  : "font-normal"
                                              }`}
                                            >
                                              {item.name}
                                            </span>
                                            {selected ? (
                                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                {/* <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              /> */}
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </Listbox>
                          </div>
                          <div className="flex flex-col">
                            <Listbox
                              value={orderType}
                              onChange={(e) => setOrderType(e)}
                            >
                              <Listbox.Label className="text-sm font-semibold text-neutral-600 mb-1">
                                Order Type
                              </Listbox.Label>
                              <div className="relative mt-1">
                                <Listbox.Button className="h-14 w-72 relative cursor-default rounded border border-solid border-neutral-200 bg-neutral-100 py-2 pl-3 pr-10 text-left shadow-smfocus:outline-none focus:ring-1sm:text-sm">
                                  <span className="flex items-center">
                                    <span className="ml-3 block truncate text-neutral-400">
                                      {orderType?.name || "Select"}
                                    </span>
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <Image
                                      src="/icon/down-icon.svg"
                                      width={13.75}
                                      height={7.5}
                                      alt="icon"
                                    />
                                  </span>
                                </Listbox.Button>
                                <Transition
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {orderTypes.map((item, index) => (
                                      <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                              ? "bg-amber-100 text-amber-900"
                                              : "text-gray-900"
                                          }`
                                        }
                                        value={item}
                                      >
                                        {({ selected }) => (
                                          <>
                                            <span
                                              className={`block truncate ${
                                                selected
                                                  ? "font-medium"
                                                  : "font-normal"
                                              }`}
                                            >
                                              {item.name}
                                            </span>
                                            {selected ? (
                                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                {/* <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              /> */}
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </Listbox>
                          </div>
                        </div>
                        <div className="flex flex-row items-start gap-8 w-full">
                          <Input
                            placeholder="Stop Loss"
                            title="Stop Loss"
                            type="number"
                            width="w-72"
                            min={0}
                            value={stopLoss}
                            onChange={(e) => setStopLoss(e)}
                          />
                          <Input
                            placeholder="Take Profit"
                            title="Take Profit"
                            width="w-72"
                            type="number"
                            min={0}
                            value={takeProfit}
                            onChange={(e) => setTakeProfit(e)}
                          />
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <Button
                          name="Create Signal"
                          color="bg-blue-600 hover:bg-blue-700"
                          textStyle="text-base font-medium text-blue-50"
                          size="w-48 h-11"
                          preIcon={
                            <Image
                              src="/icon/plus.svg"
                              width={15}
                              height={15}
                              alt="icon"
                            />
                          }
                          onClick={handleSubmit}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

CreateSignal.propTypes = {
  modal: PropTypes.bool,
  onClose: PropTypes.func,
};

CreateSignal.defaultProps = {
  modal: false,
  onClose: () => {},
};

export default CreateSignal;
