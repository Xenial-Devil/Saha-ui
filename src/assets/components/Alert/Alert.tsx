import React, { useState } from "react";
import { defaultAlertProps, AlertProps } from "./AlertProps";
import "./alert.scss";
const Alert = ({
  variant = defaultAlertProps.variant,
  message = defaultAlertProps.message,
  title = defaultAlertProps.title,
  status = defaultAlertProps.status,
  direction = defaultAlertProps.direction,
  align = defaultAlertProps.align,
  justify = defaultAlertProps.justify,
  textAlign = defaultAlertProps.textAlign,
  height = defaultAlertProps.height,
  rounded = defaultAlertProps.rounded,
  closeable = defaultAlertProps.closeable,
}: AlertProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const generateUniqueClassName = () => {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `css-${randomString}`;
  };
  const dynamicClassName = generateUniqueClassName();
  const dynamicStyles = {
    // Define your dynamic styles here
    height: `${height && height}`,
    textAlign: `${textAlign}`,
    justifyContent: `${justify}`,
    alignItems: `${align}`,
    flexDirection: `${direction}`,

    // Add more styles as needed
  };
  const dynamicStyleRule = `.${dynamicClassName} { ${Object.entries(
    dynamicStyles
  )
    .map(([property, value]) => `${property}: ${value};`)
    .join(" ")} }`;
  const styleElement = document.createElement("style");
  styleElement.innerText = dynamicStyleRule;
  document.head.appendChild(styleElement);
  return (
    <>
      {isOpen && (
        <div
          className={`w-full flex justify-between alert-${status} ${
            variant == "outline" ? "alert-border" : ""
          } p-4 ${rounded ? "rounded-lg" : ""} ${
            variant == "solid" ? "alert-filled" : ""
          } ${variant == "left-accent" ? "alert-border-left" : ""} ${
            variant == "top-accent" ? "alert-border-top" : ""
          } ${dynamicClassName}`}
        >
          <div className="w-full flex">
            <div
              className={`flex justify-center items-center ${
                direction == "row" ? "mr-4" : "flex-col"
              }`}
            >
              {status == "success" && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
                    className={`${
                      variant == "solid"
                        ? " fill-white stroke-white "
                        : "alert-icon"
                    }`}
                    stroke-width="4"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 24L22 30L34 18"
                    className={`${
                      variant == "solid" ? "alert-icon" : "stroke-white "
                    }`}
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
              {status == "info" && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
                    className={`${
                      variant == "solid"
                        ? "stroke-white fill-white "
                        : "alert-icon"
                    }`}
                    stroke-width="4"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24 11C25.3807 11 26.5 12.1193 26.5 13.5C26.5 14.8807 25.3807 16 24 16C22.6193 16 21.5 14.8807 21.5 13.5C21.5 12.1193 22.6193 11 24 11Z"
                    className={`${
                      variant == "solid" ? "alert-icon " : "fill-white "
                    }`}
                  />
                  <path
                    d="M24.5 34V20H23.5H22.5"
                    className={`${
                      variant == "solid" ? "alert-icon " : "stroke-white"
                    }`}
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 34H28"
                    className={`${
                      variant == "solid" ? "alert-icon " : "stroke-white"
                    }`}
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
              {(status == "warning" || status == "error") && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
                    className={`${
                      variant == "solid"
                        ? "stroke-white fill-white"
                        : "alert-icon"
                    }`}
                    stroke-width="4"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24 37C25.3807 37 26.5 35.8807 26.5 34.5C26.5 33.1193 25.3807 32 24 32C22.6193 32 21.5 33.1193 21.5 34.5C21.5 35.8807 22.6193 37 24 37Z"
                    className={`${
                      variant == "solid"
                        ? "alert-icon"
                        : "stroke-white fill-white"
                    }`}
                  />
                  <path
                    d="M24 12V28"
                    className={`${
                      variant == "solid"
                        ? "alert-icon"
                        : "stroke-white fill-white"
                    }`}
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </div>
            <div className="flex flex-col">
              <div
                className={`${
                  variant == "solid" ? "text-white" : "alert-title"
                }`}
              >
                {title}
              </div>
              <div
                className={`${
                  variant == "solid" ? "text-white" : "alert-text"
                }`}
              >
                {message.replace(
                  /(https?:\/\/[^\s]+)/g,
                  '<span className="alert-link">$1</span>'
                )}
              </div>
            </div>
          </div>
          {closeable && (
            <div
              className="relative justify-center group cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="hidden absolute top-[.89rem] -left-[.6rem] group-hover:block">
                <div className="flex justify-center items-center flex-col">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 29L24 17L36 29H12Z"
                      className={`${
                        variant == "solid"
                          ? "stroke-white fill-white"
                          : "alert-icon"
                      }`}
                      stroke-width="4"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div
                    className={`${
                      variant == "solid"
                        ? "alert-text bg-white"
                        : "text-white alert-filled"
                    } -mt-[.6rem] p-1 rounded-md`}
                  >
                    colse
                  </div>
                </div>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer alert-icon"
              >
                <path
                  d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                  className={`${
                    variant == "solid"
                      ? "stroke-white fill-white"
                      : "alert-icon"
                  }`}
                  stroke-width="4"
                  stroke-linejoin="round"
                />
                <path
                  d="M29.6567 18.3432L18.343 29.6569"
                  className={`${
                    variant == "solid"
                      ? "alert-icon"
                      : "stroke-white fill-white"
                  }`}
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.3433 18.3432L29.657 29.6569"
                  className={`${
                    variant == "solid"
                      ? "alert-icon"
                      : "stroke-white fill-white"
                  }`}
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Alert;
