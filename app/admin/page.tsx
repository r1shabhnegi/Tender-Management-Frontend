"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  BarChartHorizontalBig,
  Clock,
  Coins,
  FileArchive,
  FilePlus2,
  FileText,
  Trophy,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AdminPagesWrapper from "@/components/Admin/AdminPagesWrapper";

// Mock data for demonstration (will need to be replaced with actual API calls)
const mockStats = {
  totalTenders: 24,
  activeTenders: 12,
  archivedTenders: 8,
  draftTenders: 4,
  totalBids: 56,
  pendingBids: 23,
  approvedBids: 33,
  totalVendors: 42,
  activeVendors: 38,
  inactiveVendors: 4,
  totalValue: "₹12,450,000",
  categoryCount: 18,
};

const recentTenders = [
  {
    id: 1,
    title: "Hospital Equipment Procurement",
    tenderNumber: "TERI-2023-045",
    date: "2023-07-15",
    status: "active",
    category: "Medical",
    bids: 8,
  },
  {
    id: 2,
    title: "IT Infrastructure Upgrade",
    tenderNumber: "TERI-2023-046",
    date: "2023-07-10",
    status: "active",
    category: "IT",
    bids: 12,
  },
  {
    id: 3,
    title: "Office Renovation",
    tenderNumber: "TERI-2023-044",
    date: "2023-07-05",
    status: "closed",
    category: "Construction",
    bids: 6,
  },
  {
    id: 4,
    title: "Vehicle Fleet Expansion",
    tenderNumber: "TERI-2023-043",
    date: "2023-07-01",
    status: "active",
    category: "Automotive",
    bids: 10,
  },
];

const recentBids = [
  {
    id: 1,
    tender: "Hospital Equipment Procurement",
    vendor: "MediTech Solutions",
    date: "2023-07-14",
    status: "pending",
    amount: "₹1,245,000",
  },
  {
    id: 2,
    tender: "IT Infrastructure Upgrade",
    vendor: "TechPro Systems",
    date: "2023-07-09",
    status: "approved",
    amount: "₹2,876,000",
  },
  {
    id: 3,
    tender: "Office Renovation",
    vendor: "BuildRight Construction",
    date: "2023-07-04",
    status: "rejected",
    amount: "₹980,000",
  },
  {
    id: 4,
    tender: "IT Infrastructure Upgrade",
    vendor: "NexGen IT",
    date: "2023-07-08",
    status: "approved",
    amount: "₹2,650,000",
  },
];

const topVendors = [
  {
    id: 1,
    name: "TechPro Systems",
    bids: 12,
    wins: 8,
    amount: "₹8,450,000",
    category: "IT",
    rating: 4.8,
  },
  {
    id: 2,
    name: "MediTech Solutions",
    bids: 10,
    wins: 6,
    amount: "₹6,275,000",
    category: "Medical",
    rating: 4.5,
  },
  {
    id: 3,
    name: "BuildRight Construction",
    bids: 8,
    wins: 4,
    amount: "₹5,120,000",
    category: "Construction",
    rating: 4.2,
  },
  {
    id: 4,
    name: "GreenEnergy Systems",
    bids: 6,
    wins: 3,
    amount: "₹4,350,000",
    category: "Energy",
    rating: 4.6,
  },
];

const categoryDistribution = [
  { name: "IT", count: 8, percentage: 32 },
  { name: "Medical", count: 6, percentage: 24 },
  { name: "Construction", count: 5, percentage: 20 },
  { name: "Automotive", count: 3, percentage: 12 },
  { name: "Energy", count: 3, percentage: 12 },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "approved":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "closed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
};

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // In a real implementation, data would be fetched from APIs
  useEffect(() => {
    // Fetch dashboard data from the server
    // This would include statistics, recent tenders, recent bids, etc.
  }, []);

  return (
    <div className='pt-[3.5rem]'>
      <AdminPagesWrapper>
        <div className='container py-6 space-y-6'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
            <div className='space-x-2'>
              <Button
                variant='outline'
                onClick={() => router.push("/admin/create-tender")}>
                <FilePlus2 className='mr-2 h-4 w-4' /> New Tender
              </Button>
            </div>
          </div>

          <Tabs
            defaultValue='overview'
            value={activeTab}
            className='space-y-4'
            onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='tenders'>Tenders</TabsTrigger>
              <TabsTrigger value='bids'>Bids</TabsTrigger>
              <TabsTrigger value='vendors'>Vendors</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent
              value='overview'
              className='space-y-4'>
              {/* Stats Cards */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <Card className='shadow-none'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Tenders
                    </CardTitle>
                    <FileText className='h-4 w-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {mockStats.totalTenders}
                    </div>
                    <p className='text-xs text-muted-foreground'>
                      {mockStats.activeTenders} active,{" "}
                      {mockStats.archivedTenders} archived
                    </p>
                  </CardContent>
                </Card>

                <Card className='shadow-none'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Bids
                    </CardTitle>
                    <BriefcaseBusiness className='h-4 w-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {mockStats.totalBids}
                    </div>
                    <p className='text-xs text-muted-foreground'>
                      {mockStats.pendingBids} pending, {mockStats.approvedBids}{" "}
                      approved
                    </p>
                  </CardContent>
                </Card>

                <Card className='shadow-none'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Registered Vendors
                    </CardTitle>
                    <Users className='h-4 w-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {mockStats.totalVendors}
                    </div>
                    <p className='text-xs text-muted-foreground'>
                      {mockStats.activeVendors} active,{" "}
                      {mockStats.inactiveVendors} inactive
                    </p>
                  </CardContent>
                </Card>

                <Card className='shadow-none'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Value
                    </CardTitle>
                    <Coins className='h-4 w-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {mockStats.totalValue}
                    </div>
                    <p className='text-xs text-muted-foreground'>
                      Across {mockStats.totalTenders} tenders
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity Section */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Recent Tenders */}
                <Card className='col-span-1 shadow-none'>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <CardTitle>Recent Tenders</CardTitle>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => router.push("/admin/tenders")}>
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentTenders.map((tender) => (
                          <TableRow
                            key={tender.id}
                            className='cursor-pointer hover:bg-muted/50'
                            onClick={() =>
                              router.push(`/admin/tenders/${tender.id}`)
                            }>
                            <TableCell className='font-medium'>
                              {tender.title}
                            </TableCell>
                            <TableCell>{formatDate(tender.date)}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(tender.status)}>
                                {tender.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Recent Bids */}
                <Card className='col-span-1 shadow-none'>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <CardTitle>Recent Bids</CardTitle>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => router.push("/admin/bids")}>
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Vendor</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentBids.map((bid) => (
                          <TableRow
                            key={bid.id}
                            className='cursor-pointer hover:bg-muted/50'
                            onClick={() =>
                              router.push(`/admin/bids/${bid.id}`)
                            }>
                            <TableCell className='font-medium'>
                              {bid.vendor}
                            </TableCell>
                            <TableCell>{formatDate(bid.date)}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(bid.status)}>
                                {bid.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Category Distribution */}
              <Card className='shadow-none'>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {categoryDistribution.map((category) => (
                      <div
                        key={category.name}
                        className='space-y-1'>
                        <div className='flex justify-between text-sm'>
                          <span>{category.name}</span>
                          <span className='text-muted-foreground'>
                            {category.count} tenders ({category.percentage}%)
                          </span>
                        </div>
                        <Progress
                          value={category.percentage}
                          className='h-2'
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tenders Tab */}
            <TabsContent
              value='tenders'
              className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Active Tenders
                    </CardTitle>
                    <FileText className='h-4 w-4 text-blue-500' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {mockStats.activeTenders}
                    </div>
                    <Button
                      variant='link'
                      className='p-0 h-auto'
                      onClick={() =>
                        router.push("/admin/tenders?status=active")
                      }>
                      View active tenders
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Archived Tenders
                    </CardTitle>
                    <FileArchive className='h-4 w-4 text-gray-500' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {mockStats.archivedTenders}
                    </div>
                    <Button
                      variant='link'
                      className='p-0 h-auto'
                      onClick={() => router.push("/admin/archived")}>
                      View archived tenders
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Draft Tenders
                    </CardTitle>
                    <Clock className='h-4 w-4 text-yellow-500' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {mockStats.draftTenders}
                    </div>
                    <Button
                      variant='link'
                      className='p-0 h-auto'
                      onClick={() =>
                        router.push("/admin/tenders?status=draft")
                      }>
                      View draft tenders
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <CardTitle>Latest Tenders</CardTitle>
                    <Button onClick={() => router.push("/admin/create-tender")}>
                      Create New Tender
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Tender #</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Bids</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTenders.map((tender) => (
                        <TableRow
                          key={tender.id}
                          className='cursor-pointer hover:bg-muted/50'
                          onClick={() =>
                            router.push(`/admin/tenders/${tender.id}`)
                          }>
                          <TableCell className='font-medium'>
                            {tender.title}
                          </TableCell>
                          <TableCell>{tender.tenderNumber}</TableCell>
                          <TableCell>{tender.category}</TableCell>
                          <TableCell>{formatDate(tender.date)}</TableCell>
                          <TableCell>{tender.bids}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(tender.status)}>
                              {tender.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bids Tab */}
            <TabsContent
              value='bids'
              className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Bids
                    </CardTitle>
                    <BriefcaseBusiness className='h-4 w-4 text-blue-500' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {mockStats.totalBids}
                    </div>
                    <Button
                      variant='link'
                      className='p-0 h-auto'
                      onClick={() => router.push("/admin/bids")}>
                      View all bids
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Pending Bids
                    </CardTitle>
                    <Clock className='h-4 w-4 text-yellow-500' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {mockStats.pendingBids}
                    </div>
                    <Button
                      variant='link'
                      className='p-0 h-auto'
                      onClick={() => router.push("/admin/bids?status=pending")}>
                      View pending bids
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Approved Bids
                    </CardTitle>
                    <Trophy className='h-4 w-4 text-green-500' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {mockStats.approvedBids}
                    </div>
                    <Button
                      variant='link'
                      className='p-0 h-auto'
                      onClick={() =>
                        router.push("/admin/bids?status=approved")
                      }>
                      View approved bids
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Bids</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Tender</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentBids.map((bid) => (
                        <TableRow
                          key={bid.id}
                          className='cursor-pointer hover:bg-muted/50'
                          onClick={() => router.push(`/admin/bids/${bid.id}`)}>
                          <TableCell className='font-medium'>
                            {bid.vendor}
                          </TableCell>
                          <TableCell>{bid.tender}</TableCell>
                          <TableCell>{formatDate(bid.date)}</TableCell>
                          <TableCell>{bid.amount}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(bid.status)}>
                              {bid.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vendors Tab */}
            <TabsContent
              value='vendors'
              className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Vendors
                    </CardTitle>
                    <Users className='h-4 w-4 text-blue-500' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {mockStats.totalVendors}
                    </div>
                    <Button
                      variant='link'
                      className='p-0 h-auto'
                      onClick={() => router.push("/admin/vendors")}>
                      Manage vendors
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Active Vendors
                    </CardTitle>
                    <Building2 className='h-4 w-4 text-green-500' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {mockStats.activeVendors}
                    </div>
                    <Button
                      variant='link'
                      className='p-0 h-auto'
                      onClick={() =>
                        router.push("/admin/vendors?status=active")
                      }>
                      View active vendors
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Categories
                    </CardTitle>
                    <BarChartHorizontalBig className='h-4 w-4 text-purple-500' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {mockStats.categoryCount}
                    </div>
                    <Button
                      variant='link'
                      className='p-0 h-auto'
                      onClick={() => router.push("/admin/categories")}>
                      Manage categories
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Bids</TableHead>
                        <TableHead>Wins</TableHead>
                        <TableHead>Total Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topVendors.map((vendor) => (
                        <TableRow
                          key={vendor.id}
                          className='cursor-pointer hover:bg-muted/50'
                          onClick={() =>
                            router.push(`/admin/vendors/${vendor.id}`)
                          }>
                          <TableCell>
                            <div className='flex items-center gap-2'>
                              <Avatar className='h-8 w-8'>
                                <AvatarFallback>
                                  {vendor.name.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <span className='font-medium'>{vendor.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{vendor.category}</TableCell>
                          <TableCell>{vendor.bids}</TableCell>
                          <TableCell>{vendor.wins}</TableCell>
                          <TableCell>{vendor.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AdminPagesWrapper>
    </div>
  );
};

export default AdminDashboard;
