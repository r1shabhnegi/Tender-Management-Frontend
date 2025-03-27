"use client";
import { useRefreshTokenQuery } from "@/Redux/auth/authApi";
import { setIsRefreshing, setUser } from "@/Redux/auth/authSlice";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

interface Props {
  children: React.ReactNode;
}
const PersistentUser: FC<Props> = ({ children }) => {
  const { data, isSuccess, isLoading } = useRefreshTokenQuery({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data.user));
    }
  }, [data, isSuccess, dispatch]);

  useEffect(() => {
    dispatch(setIsRefreshing(isLoading));
  }, [isLoading, dispatch]);

  return children;
};

export default PersistentUser;
