import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const GeneralWrapper: FC<Props> = ({ children }) => {
  return (
    <div className='max-w-[85rem] mx-auto px-4 py-4 sm:px-6 lg:px-8'>
      {children}
    </div>
  );
};

export default GeneralWrapper;
