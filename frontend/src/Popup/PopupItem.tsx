import React, { Fragment } from "react";
import { PopupType, usePopup } from "../Layout/Wrapper";

type PopupItemProps = {
    popup: PopupType;
    element: React.ReactNode;
}

export function PopupItem(props: PopupItemProps) {
    const { popup, handlePopup, title } = usePopup();
    if (props.popup != popup) return null;
    return <Fragment>{props.element}</Fragment>
}