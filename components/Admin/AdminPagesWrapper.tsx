import React from "react";

const AdminPagesWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className='w-full px-12 mb-8'>{children}</div>;
};

export default AdminPagesWrapper;
