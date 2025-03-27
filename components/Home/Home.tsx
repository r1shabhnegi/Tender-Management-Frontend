"use client";
import { useGetLiveTendersQuery } from "@/Redux/tender/tenderApi";
import React, { useEffect, useState } from "react";
import TenderCard from "../Tender/TenderCard";
import GeneralWrapper from "../Shared/GeneralWrapper";
import HomeTendersNavBar from "./HomeTendersNavBar";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import PageError from "../Shared/PageError";
import TenderCardSkeleton from "../Shared/skeleton/TenderCardSkeleton";
import { ITenderCard } from "@/app/Types/Tender-Types";

const Home = () => {
  const { tenderHomeSearchQuery } = useSelector(
    (state: RootState) => state.tenderSlice
  );

  const [queryParams, setQueryParams] = useState(tenderHomeSearchQuery);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQueryParams(tenderHomeSearchQuery);
    }, 500);

    return () => clearTimeout(timeout);
  }, [tenderHomeSearchQuery]);

  const { data, isLoading, isError } = useGetLiveTendersQuery(queryParams);

  if (isError) return <PageError />;

  return (
    <GeneralWrapper>
      <HomeTendersNavBar />

      {isLoading && (
        <div className='flex flex-col gap-5'>
          <TenderCardSkeleton />
          <TenderCardSkeleton />
          <TenderCardSkeleton />
        </div>
      )}

      {!isLoading && data?.tenders?.length === 0 && (
        <div className='flex flex-col mt-20 items-center justify-center'>
          <h1 className='text-2xl font-semibold'>No tenders found</h1>
          <p className='text-gray-500'>Please search for a different keyword</p>
        </div>
      )}

      {!isLoading && data.tenders.length !== 0 && (
        <div className='flex flex-col gap-5'>
          {data?.tenders.map((tender: ITenderCard) => (
            <TenderCard
              key={tender?.id}
              tender={tender}
            />
          ))}
        </div>
      )}
    </GeneralWrapper>
  );
};

export default Home;
