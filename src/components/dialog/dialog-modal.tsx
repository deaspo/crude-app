import { PropsWithChildren } from "react";

export const DialogModal = (props: PropsWithChildren<{}>) => {
  return (
    <div className="modal-dialog relative w-auto pointer-events-none">
      <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        {props.children}
      </div>
    </div>
  );
};
