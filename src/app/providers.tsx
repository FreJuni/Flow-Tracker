import { TRPCReactProvider } from "./trpc";
import { HydrateClient } from "../server/trpc-server";

export default function Providers({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <TRPCReactProvider>
                    <HydrateClient>
                        {children}
                    </HydrateClient>
                </TRPCReactProvider>
            </body>
        </html>
    );
}