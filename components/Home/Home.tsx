"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ShoppingBag,
  Zap,
} from "lucide-react";
import HomeSidebar from "./HomeSidebar";
import HomeHeader from "./HomeHeader";
import HomeTendersNavBar from "./HomeTendersNavBar";
import HomeTenders from "./HomeTenders";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

const Home = () => {
  const { isLoggedIn, isRefreshing: isLoading } = useSelector(
    (state: RootState) => state.authSlice
  );

  return (
    <div className='mx-auto px-4 max-w-7xl'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='flex-1'>
          {!isLoggedIn && !isLoading ? <HomeHeader /> : null}
          <HomeTendersNavBar />
          {/* <div className='flex items-center mb-8 mt-2 justify-end gap-2'>
            <span className='text-sm bg-blue-100 px-2 py-1 rounded-lg text-text-color-1 font-semibold mb-4'>
              Latest Tenders
            </span>
          </div> */}
          <div className='flex border-b pb-4 border-primary-color-1/20 mb-3 items-center mt-8 justify- gap-2'>
            {/* <span className='text-sm bg-blue-100 px-2 py-1 rounded-lg text-text-color-1 font-semibold mb-4'>
              Latest Tenders
            </span> */}
            <span className='text-2xl font-semibold text-text-color-1'>
              Latest Tenders
            </span>
          </div>

          <HomeTenders />

          <HomeTenders />
        </div>
        <HomeSidebar />
      </div>

      {/* Information Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-10'>
        <Card className='bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100/60 rounded-xl overflow-hidden'>
          <div className='h-1.5 bg-blue-500 w-full'></div>
          <CardHeader className='pb-2 pt-5'>
            <CardTitle className='text-lg font-medium flex items-center text-gray-800'>
              <div className='bg-blue-100/70 p-2 rounded-md mr-3'>
                <ShoppingBag className='h-5 w-5 text-blue-600' />
              </div>
              For Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-gray-600 mb-5 leading-relaxed'>
              Access new business opportunities, purchase tender documents, and
              submit competitive bids all in one place.
            </p>
            <Link
              href='/vendor-board'
              className='block'>
              <Button
                variant='outline'
                className='w-full bg-white hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-800 rounded-lg transition-all font-medium'>
                Vendor Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className='bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100/60 rounded-xl overflow-hidden'>
          <div className='h-1.5 bg-purple-500 w-full'></div>
          <CardHeader className='pb-2 pt-5'>
            <CardTitle className='text-lg font-medium flex items-center text-gray-800'>
              <div className='bg-purple-100/70 p-2 rounded-md mr-3'>
                <FileText className='h-5 w-5 text-purple-600' />
              </div>
              For Organizations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-gray-600 mb-5 leading-relaxed'>
              Publish tenders, manage vendor applications, and evaluate bids
              efficiently with our comprehensive tools.
            </p>
            <Link
              href='/admin'
              className='block'>
              <Button
                variant='outline'
                className='w-full bg-white hover:bg-purple-50 border-purple-200 text-purple-700 hover:text-purple-800 rounded-lg transition-all font-medium'>
                Admin Portal
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className='bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100/60 rounded-xl overflow-hidden'>
          <div className='h-1.5 bg-green-500 w-full'></div>
          <CardHeader className='pb-2 pt-5'>
            <CardTitle className='text-lg font-medium flex items-center text-gray-800'>
              <div className='bg-green-100/70 p-2 rounded-md mr-3'>
                <ShieldCheck className='h-5 w-5 text-green-600' />
              </div>
              Transparency & Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-gray-600 mb-5 leading-relaxed'>
              Our platform ensures fair competition, transparency in the bidding
              process, and compliance with regulations.
            </p>
            <Link
              href='/about'
              className='block'>
              <Button
                variant='outline'
                className='w-full bg-white hover:bg-green-50 border-green-200 text-green-700 hover:text-green-800 rounded-lg transition-all font-medium'>
                Learn More
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Why Choose Us Section */}
      <div className='bg-gradient-to-br from-slate-50 to-blue-50/40 p-8 rounded-xl border border-blue-100/40 shadow-sm mb-12'>
        <h2 className='text-2xl font-bold mb-10 text-center text-gray-800 relative inline-block left-1/2 -translate-x-1/2'>
          Why Choose Our Platform?
          <span className='block h-1 w-20 bg-blue-500 mt-2 mx-auto rounded-full'></span>
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='flex flex-col items-center text-center group bg-white p-6 rounded-xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300'>
            <div className='bg-blue-100/50 p-4 rounded-xl mb-4 group-hover:bg-blue-100 transition-all'>
              <Zap className='h-6 w-6 text-blue-600' />
            </div>
            <h3 className='font-semibold mb-2 text-gray-800'>
              Streamlined Process
            </h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              End-to-end management of the tender lifecycle from publication to
              award notification
            </p>
          </div>
          <div className='flex flex-col items-center text-center group bg-white p-6 rounded-xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300'>
            <div className='bg-green-100/50 p-4 rounded-xl mb-4 group-hover:bg-green-100 transition-all'>
              <CheckCircle2 className='h-6 w-6 text-green-600' />
            </div>
            <h3 className='font-semibold mb-2 text-gray-800'>
              Vendor Verification
            </h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              Verified vendor profiles ensure quality and trustworthy
              participants in every tender
            </p>
          </div>
          <div className='flex flex-col items-center text-center group bg-white p-6 rounded-xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300'>
            <div className='bg-purple-100/50 p-4 rounded-xl mb-4 group-hover:bg-purple-100 transition-all'>
              <BookOpen className='h-6 w-6 text-purple-600' />
            </div>
            <h3 className='font-semibold mb-2 text-gray-800'>
              Real-time Updates
            </h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              Get instant notifications about new tenders and bid status changes
              via email and dashboard
            </p>
          </div>
          <div className='flex flex-col items-center text-center group bg-white p-6 rounded-xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300'>
            <div className='bg-amber-100/50 p-4 rounded-xl mb-4 group-hover:bg-amber-100 transition-all'>
              <ShieldCheck className='h-6 w-6 text-amber-600' />
            </div>
            <h3 className='font-semibold mb-2 text-gray-800'>
              Secure Documentation
            </h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              All tender documents and bid submissions are securely stored and
              managed with encryption
            </p>
          </div>
        </div>
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
      <iframe
        src='https://india-trade-network.vercel.app'
        className='w-full h-[100vh]'></iframe>
    </div>
  );
};

export default Home;
