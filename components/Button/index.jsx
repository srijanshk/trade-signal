import PropTypes from "prop-types";
import classNames from "classnames";
import { isEmpty } from "ramda";

const Button = ({
  className,
  preIcon,
  padding,
  postIcon,
  color,
  border,
  name,
  disabled,
  size,
  ringSize,
  alert,
  textStyle,
  onClick,
}) => {
  const handleClick = () => {
    if (disabled && isEmpty(alert)) {
      return;
    } else if (disabled && !isEmpty(alert)) {
    } else {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={classNames(
        "focus:outline-none focus:shadow-outline flex justify-between items-center",
        ringSize,
        color,
        border,
        size,
        className,
        padding,
        disabled && "cursor-not-allowed"
      )}
      disabled={disabled && isEmpty(alert)}
      onClick={handleClick}
    >
      {preIcon && preIcon}
      <div className={textStyle}>{name}</div>
      {postIcon && postIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  border: PropTypes.string,
  padding: PropTypes.string,
  size: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  alert: PropTypes.string,
  ringSize: PropTypes.string,
  textStyle: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: "",
  padding: "py-2 px-4 ",
  border: "border border-solid border-blue-600",
  size: "",
  color: "bg-blue-50 hover:bg-blue-100",
  name: null,
  disabled: false,
  ringSize: "rounded",
  textStyle: "text-blue-600 text-base font-medium",
  alert: "",
  onClick: () => {},
};

export default Button;
