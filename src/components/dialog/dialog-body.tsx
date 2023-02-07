import { PropsWithChildren } from "react";

export const DialogBody = (props: PropsWithChildren<{}>) => {
  return <div className="modal-body relative p-4">{props.children}</div>;
};
