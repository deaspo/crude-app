import { PropsWithChildren } from "react";

export const DialogHeader = (props: PropsWithChildren<{}>) => {
  return (
    <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
      <h5
        className="text-xl font-medium leading-normal text-gray-800"
        id="commonModalLabel"
      >
        {props.children}
      </h5>
    </div>
  );
};
