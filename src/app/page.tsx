import { Button } from "../components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Lucid Ledger Project</h1>
          <p>The premium Auth UI is ready!</p>
          <div className="flex gap-4 mt-6">
            <Link href="/register">
              <Button>Register Page</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Login Page</Button>
            </Link>
          </div>
        </div>
        <div className="font-mono text-xs text-muted-foreground mt-10">
          (Check out <code className="bg-slate-100 px-1 rounded">/register</code> and <code className="bg-slate-100 px-1 rounded">/login</code>)
        </div>
      </div>
    </div>
  )
}
