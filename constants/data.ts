export type UserTypes = "customer" | "driver";
export enum UserType {
  customer = "customer",
  driver = "driver",
}
export interface Customer {
  id: number;
  type: UserTypes;
  verified: boolean;
  fname: string;
  lname: string;
  orders: JobType[];
}

export interface Driver {
  id: number;
  type: UserTypes;
  verified: boolean;
  fname: string;
  lname: string;
  jobs: JobType[];
  bids: BidType[];
  plate_num: string;
}
export type User = Customer | Driver;
export type Users = (Customer | Driver)[];

export type JobStatus =
  | "unassigned"
  | "assigned"
  | "pickedUp"
  | "complete"
  | "confirmed";

export interface JobType {
  id: string | number;
  status: JobStatus;
  driver: undefined | number;
  pickup: string;
  dropoff: string;
  loadType: string;
  price: string | number;
}

export interface BidType {
  id: string | number;
  job_id: string | number;
  amount: string | number;
  bidder_id: string | number;
}

export const MockData: JobType[] = [
  {
    id: 1,
    status: "unassigned",
    driver: undefined,
    pickup: "henny",
    dropoff: "Kality",
    loadType: "Ceramic",
    price: "80000",
  },
  {
    id: 2,
    status: "unassigned",
    driver: undefined,
    pickup: "Djibouti",
    dropoff: "Kality",
    loadType: "Ceramic",
    price: "80000",
  },
  {
    id: 3,
    status: "complete",
    driver: 1,
    pickup: "Djibouti",
    dropoff: "Kality",
    loadType: "Ceramic",
    price: "80000",
  },
  {
    id: 4,
    status: "confirmed",
    driver: 1,
    pickup: "Djibouti",
    dropoff: "Kality",
    loadType: "Ceramic",
    price: "80000",
  },
  {
    id: 5,
    status: "assigned",
    driver: 1,
    pickup: "Djibouti",
    dropoff: "Kality",
    loadType: "Ceramic",
    price: "80000",
  },
];

export const MockUsers: Users = [
  {
    id: 101,
    type: "driver",
    verified: true,
    fname: "John",
    lname: "Doe",
    jobs: [],
    bids: [],
    plate_num: "TAD 123",
  },
  {
    id: 102,
    type: "driver",
    verified: false,
    fname: "Jane",
    lname: "Smith",
    jobs: [],
    bids: [],
    plate_num: "WXY 456",
  },
  {
    id: 201,
    type: "customer",
    verified: true,
    fname: "Alice",
    lname: "Williams",
    orders: [],
  },
  {
    id: 202,
    type: "customer",
    verified: false,
    fname: "Bob",
    lname: "Johnson",
    orders: [],
  },
];
export const bids: BidType[] = [
  { id: 1, job_id: 4, amount: 85000, bidder_id: 21 },
  { id: 2, job_id: 1, amount: 85000, bidder_id: 22 },
  { id: 3, job_id: 1, amount: 85000, bidder_id: 22 },
  { id: 4, job_id: 1, amount: 85000, bidder_id: 22 },
];
