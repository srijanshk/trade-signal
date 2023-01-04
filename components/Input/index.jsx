import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isEmpty, isNil } from "ramda";

const Input = ({
  value = "",
  className = "",
  type = "text",
  as = "input",
  rows = "1",
  disabled = false,
  error = "",
  placeholder = "",
  inputRef = { current: null },
  maxLength = 0,
  min = 0,
  max = 0,
  width = "w-80",
  height = "h-14",
  tooltip = false,
  postIcon = null,
  preIcon = null,
  onChange = () => {},
  onEnter = () => {},
  onBlur = () => {},
  onClear = () => {},
}) => {
  const [inputValue, setValue] = useState(value || "");

  useEffect(() => {
    if (value !== inputValue) setValue(value || "");
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    onChange("");
    onClear();
  };

  const handleBlur = (e) => {
    onBlur(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      onEnter();
    }
  };

  const options = maxLength !== 0 ? { maxLength } : {};

  return (
    <div className="relative">
      {!isNil(preIcon) && (
        <div className="absolute inset-y-0 left-0 pr-3 flex items-center text-sm leading-5">
          {preIcon}
        </div>
      )}
      {as === "input" ? (
        <input
          {...options}
          className={classNames(
            "shadow h-14 appearance-none borde border-neutral-200 rounded py-2 px-3 text-neutral-400 mb-3 leading-tight focus:outline-none focus:shadow-outline",
            preIcon ? "pl-8" : "pl-4",
            width,
            height,
            disabled ? "bg-neutral-200" : "bg-neutral-100"
          )}
          autoComplete="new-password"
          disabled={disabled}
          placeholder={placeholder}
          ref={inputRef}
          value={inputValue}
          type={type}
          as={as}
          rows={rows}
          min={min}
          max={max}
          title={tooltip ? value : ""}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <textarea
          {...options}
          className={classNames(
            "shadow h-14 appearance-none borde border-neutral-200 rounded py-2 px-3 text-neutral-400 mb-3 leading-tight focus:outline-none focus:shadow-outline",
            preIcon ? "pl-8" : "pl-4",
            width,
            height,
            disabled ? "bg-neutral-200" : "bg-neutral-100"
          )}
          disabled={disabled}
          placeholder={placeholder}
          ref={inputRef}
          value={inputValue}
          type={type}
          as={"textarea"}
          rows={rows}
          title={tooltip ? value : ""}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      )}

      {!isNil(postIcon) && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
          {postIcon}
        </div>
      )}
      {!isEmpty(error) && (
        <span className="mt-2 text-red-400 text-xs">{error}</span>
      )}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  preIconClassname: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  remove: PropTypes.bool,
  tooltip: PropTypes.bool,
  clear: PropTypes.bool,
  type: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  postIcon: PropTypes.element,
  preIcon: PropTypes.element,
  as: PropTypes.oneOf(["input", "textarea"]),
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  error: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  onClear: PropTypes.func,
};

Input.defaultProps = {
  className: "",
  preIconClassname: "",
  title: "",
  value: "",
  disabled: false,
  remove: false,
  tooltip: false,
  clear: false,
  width: "w-80",
  height: "h-14",
  type: "text",
  as: "input",
  rows: "1",
  placeholder: "",
  preIcon: null,
  postIcon: null,
  inputRef: { current: null },
  direction: "horizontal",
  error: "",
  maxLength: 0,
  onChange: () => {},
  onEnter: () => {},
  onFocus: () => {},
  onClear: () => {},
};

export default Input;
