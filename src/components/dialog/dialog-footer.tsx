import { PropsWithChildren } from "react";

export const DialogFooter = (props: PropsWithChildren<{}>) => {
  return (
    <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
      {props.children}
    </div>
  );
};
