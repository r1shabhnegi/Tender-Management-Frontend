"use client";
import React, { FC, ReactNode } from "react";
import { store } from "@/Redux/store";
import { Provider } from "react-redux";

interface props {
  children: ReactNode;
}

const RootProvider: FC<props> = ({ children }: props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default RootProvider;
