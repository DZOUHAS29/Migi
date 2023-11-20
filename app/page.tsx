import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex justify-center align-bottom">
      <div className="grid w-1/6 pt-48">
        <div className="flex flex-col">
          <div className="grid p-2">
            <p className="font-mono">Username</p>
            <input type="text" className="rounded bg-blue-950 font-mono p-1" />
          </div>
          <div className="grid p-2">
            <p className="font-mono">Password</p>
            <input type="password" className="rounded bg-blue-950 p-1" />
          </div>
          <div className="grid justify-center p-2">
            <button className="bg-blue-950 p-2 rounded font-mono">Log in</button>
          </div>
          <div className="grid justify-center" p-2>
            <Link href={"/register"} className="text-sm font-mono underline">Register</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
