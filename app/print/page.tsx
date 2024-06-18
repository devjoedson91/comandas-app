"use client";
import { useSearchParams } from "next/navigation";

export default function Print() {
  const search = useSearchParams();

  const order_id = search.get("order_id");

  return <h1>{order_id}</h1>;
}
