export type JobStatus =
  | "unassigned"
  | "assigned"
  | "pickedUp"
  | "complete"
  | "confirmed";

export interface JobType {
  id: string | number;
  status: JobStatus;
  pickup: string;
  dropoff: string;
  loadType: string;
  price: string | number;
}

export const MockData: JobType[] = [
  {
    id: 1,
    status: "pickedUp",
    pickup: "henny",
    dropoff: "Kality",
    loadType: "Ceramic",
    price: "80000",
  },
  {
    id: 2,
    status: "unassigned",
    pickup: "Djibouti",
    dropoff: "Kality",
    loadType: "Ceramic",
    price: "80000",
  },
  {
    id: 3,
    status: "complete",
    pickup: "Djibouti",
    dropoff: "Kality",
    loadType: "Ceramic",
    price: "80000",
  },
  {
    id: 4,
    status: "confirmed",
    pickup: "Djibouti",
    dropoff: "Kality",
    loadType: "Ceramic",
    price: "80000",
  },
  {
    id: 5,
    status: "assigned",
    pickup: "Djibouti",
    dropoff: "Kality",
    loadType: "Ceramic",
    price: "80000",
  },
];

export const bids = [
  { job_id: 4, amount: 85000, bidder_id: 21 },
  { job_id: 1, amount: 85000, bidder_id: 22 },
  { job_id: 1, amount: 85000, bidder_id: 22 },
  { job_id: 1, amount: 85000, bidder_id: 22 },
];
