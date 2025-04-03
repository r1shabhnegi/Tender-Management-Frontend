"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { CheckCircle2, FileText, ShoppingBag } from "lucide-react";
import HomeSidebar from "./HomeSidebar";
import HomeBanner from "./HomeBanner";
import HomeTendersActionBar from "./HomeTendersActionBar";
import HomeTenders from "./HomeTenders";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { cn } from "@/lib/utils";
import { borderStyle } from "@/app/Styles";

const Home = () => {
  const { isLoggedIn, isRefreshing: isLoading } = useSelector(
    (state: RootState) => state.authSlice
  );

  return (
    <div className='mx-auto px-4 max-w-7xl'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='flex-1'>
          {!isLoggedIn && !isLoading ? <HomeBanner /> : null}
          <HomeTendersActionBar />
          <div className={cn("bg-white px-4 pb-4 mb-6 border-b", borderStyle)}>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
              <div className=' w-full flex items-center gap-3'>
                <div className='w-full'>
                  <div className='flex w-full justify-end flex-wrap gap-2 mt-2'>
                    {/* Example filters - these would be dynamic based on applied filters */}
                    <span className='text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100 inline-flex items-center gap-1'>
                      <FileText className='h-3 w-3' />
                      Category: IT Services
                    </span>
                    <span className='text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100 inline-flex items-center gap-1'>
                      <CheckCircle2 className='h-3 w-3' />
                      Status: Active
                    </span>
                    <span className='text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-100 inline-flex items-center gap-1'>
                      <ShoppingBag className='h-3 w-3' />
                      Value: ₹10L - ₹50L
                    </span>
                    <Button
                      variant='outline'
                      size='sm'
                      className='text-gray-500 rounded-full hover:text-gray-700 border-gray-200'>
                      Clear Filters
                    </Button>
                  </div>
                  <h2 className='text-2xl font-semibold text-gray-900'>
                    Latest Tenders
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <HomeTenders />
        </div>
        <HomeSidebar />
      </div>

      {/* Testimonials Section */}
      <div className='bg-white p-10 rounded-xl border border-gray-100/60 shadow-sm mb-8'>
        <h2 className='text-2xl font-bold mb-10 text-center text-gray-800 relative inline-block left-1/2 -translate-x-1/2'>
          Success Stories
          <span className='block h-1 w-16 bg-blue-500 mt-2 mx-auto rounded-full'></span>
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <Card className='border-0 shadow-none hover:shadow-none transition-all rounded-xl bg-slate-50/50 overflow-hidden group'>
            <div className='h-1 bg-blue-500/30 w-full group-hover:bg-blue-500 transition-all duration-300'></div>
            <CardContent className='p-8'>
              <p className='italic text-gray-700 mb-6 leading-relaxed'>
                &ldquo;The tender management platform streamlined our entire
                procurement process. We&rsquo;ve reduced our administrative
                overhead by 40% and increased our vendor diversity.&rdquo;
              </p>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-700 font-medium border border-blue-200/50'>
                  MS
                </div>
                <div>
                  <p className='font-medium text-gray-900'>Maria Smith</p>
                  <p className='text-sm text-gray-500'>
                    Procurement Director, TechCorp
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className='border-0 shadow-none hover:shadow-none transition-all rounded-xl bg-slate-50/50 overflow-hidden group'>
            <div className='h-1 bg-green-500/30 w-full group-hover:bg-green-500 transition-all duration-300'></div>
            <CardContent className='p-8'>
              <p className='italic text-gray-700 mb-6 leading-relaxed'>
                &ldquo;As a small business, this platform opened doors to
                opportunities we wouldn&rsquo;t have found otherwise. The
                transparent process gave us confidence to compete with larger
                vendors.&rdquo;
              </p>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-700 font-medium border border-green-200/50'>
                  JD
                </div>
                <div>
                  <p className='font-medium text-gray-900'>James Davis</p>
                  <p className='text-sm text-gray-500'>
                    CEO, Innovative Solutions Ltd
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-xl text-white text-center mb-8 overflow-hidden relative'>
        <div className='absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2'></div>
        <div className='absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/4'></div>
        <h2 className='text-xl md:text-2xl font-bold mb-4 relative'>
          Ready to streamline your tender management?
        </h2>
        <p className='text-blue-100 mb-6 max-w-xl mx-auto'>
          Join thousands of organizations and vendors who are already saving
          time and resources with our platform.
        </p>
        <div className='flex flex-wrap gap-4 justify-center'>
          <Link href='/register'>
            <Button className='bg-white text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-lg'>
              Register Now
            </Button>
          </Link>
          <Link href='/about'>
            <Button
              variant='outline'
              className='bg-transparent border-white text-white hover:bg-blue-700 px-6 py-2 rounded-lg'>
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
