"use client";
import Heading from "@/components/Shared/Heading";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Star, Tag } from "lucide-react";
import { format } from "date-fns";

const VendorBidsPage = () => {
  // Mock data - in a real app, this would come from an API
  const bids = [
    {
      id: "1",
      tenderId: "7",
      tenderTitle: "Renewable Energy Equipment",
      tenderNumber: "TERI/2023/ENERGY/007",
      bidDate: "2023-11-20",
      ddNumber: "DD98765432",
      ddDate: "2023-11-18",
      bankName: "State Bank of India",
      branchName: "Delhi Main Branch",
      technicalScore: 4.5,
      financialScore: 4.2,
      status: "Under Review",
    },
    {
      id: "2",
      tenderId: "8",
      tenderTitle: "IT Infrastructure Upgrade",
      tenderNumber: "TERI/2023/IT/008",
      bidDate: "2023-11-15",
      ddNumber: "DD87654321",
      ddDate: "2023-11-13",
      bankName: "HDFC Bank",
      branchName: "Connaught Place",
      technicalScore: 3.8,
      financialScore: 4.0,
      status: "Qualified",
    },
    {
      id: "3",
      tenderId: "9",
      tenderTitle: "Conference Hall Audio-Visual System",
      tenderNumber: "TERI/2023/INFRA/009",
      bidDate: "2023-11-25",
      ddNumber: "DD76543210",
      ddDate: "2023-11-23",
      bankName: "ICICI Bank",
      branchName: "South Extension",
      status: "Submitted",
    },
  ];

  // Function to determine status badge color
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Qualified":
        return "bg-green-100 text-green-800 border-green-200";
      case "Under Review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Submitted":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className='pt-[3.8rem] px-8 py-6'>
      <Heading
        title='Your Bids'
        description='Track all your submitted bids'
        keywords='Bids, Vendor, Tenders'
      />

      <div className='mt-6'>
        <h1 className='text-2xl font-bold mb-6'>Submitted Bids</h1>

        {bids.length > 0 ? (
          <div className='grid grid-cols-1 gap-6'>
            {bids.map((bid) => (
              <Card
                className='bg-white shadow-sm hover:shadow-md transition-shadow'
                key={bid.id}>
                <CardContent className='p-6'>
                  <div className='flex flex-col md:flex-row justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-2'>
                        <span
                          className={`status-pill text-xs border rounded-full px-2 py-0.5 flex items-center ${getStatusBadgeClass(
                            bid.status
                          )}`}>
                          {bid.status}
                        </span>
                        <span className='text-xs text-gray-500'>
                          Bid ID: {bid.id}
                        </span>
                      </div>

                      <h3 className='text-lg font-medium'>{bid.tenderTitle}</h3>
                      <div className='flex items-center mt-1 text-sm text-gray-600'>
                        <Tag className='h-4 w-4 mr-1' />
                        <span>{bid.tenderNumber}</span>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                        <div>
                          <p className='text-xs text-gray-500'>
                            Bid Submission Date
                          </p>
                          <div className='flex items-center mt-1'>
                            <Calendar className='h-3 w-3 mr-1 text-gray-400' />
                            <span className='text-sm'>
                              {format(new Date(bid.bidDate), "PPP")}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className='text-xs text-gray-500'>DD Number</p>
                          <div className='flex items-center mt-1'>
                            <FileText className='h-3 w-3 mr-1 text-gray-400' />
                            <span className='text-sm'>{bid.ddNumber}</span>
                          </div>
                        </div>
                      </div>

                      {bid.technicalScore !== undefined &&
                        bid.financialScore !== undefined && (
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                            <div>
                              <p className='text-xs text-gray-500'>
                                Technical Score
                              </p>
                              <div className='flex items-center mt-1'>
                                <Star className='h-3 w-3 text-yellow-500 fill-yellow-500 mr-1' />
                                <span className='text-sm'>
                                  {bid.technicalScore}/5
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className='text-xs text-gray-500'>
                                Financial Score
                              </p>
                              <div className='flex items-center mt-1'>
                                <Star className='h-3 w-3 text-yellow-500 fill-yellow-500 mr-1' />
                                <span className='text-sm'>
                                  {bid.financialScore}/5
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>

                    <div className='mt-4 md:mt-0 flex flex-col items-end justify-between'>
                      <Button className='bg-blue-600 hover:bg-blue-700 w-full md:w-auto'>
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className='text-center py-10'>
            <p className='text-gray-500 mb-4'>
              You haven&apos;t submitted any bids yet.
            </p>
            <Button className='bg-blue-600 hover:bg-blue-700'>
              Browse Available Tenders
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorBidsPage;
