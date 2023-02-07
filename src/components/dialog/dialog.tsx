import { PropsWithChildren } from "react";

export const Dialog = (props: PropsWithChildren<{}>) => {
  return (
    <div
      className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="commonModal"
      tabIndex={-1}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="commonModalLabel"
      aria-hidden="true"
    >
      {props.children}
    </div>
  );
};
