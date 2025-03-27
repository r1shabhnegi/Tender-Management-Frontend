import React, { FC } from "react";

interface Props {
  categoryId: string;
}

const CategoryTenders: FC<Props> = ({ categoryId }) => {
  console.log(categoryId);
  return <div>CategoryTenders</div>;
};

export default CategoryTenders;
