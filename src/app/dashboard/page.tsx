"use client"

import { authClient } from "@/src/utils/auth-client";
import { useTRPC } from "../trpc";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {

    // const { data: session } = authClient.useSession();
    const trpc = useTRPC();

    const queryOptions = trpc.transaction.test.queryOptions({
        name: "Tung",
    });

    const { data, isLoading, error } = useQuery(queryOptions);

    console.log("data:", data);


    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}