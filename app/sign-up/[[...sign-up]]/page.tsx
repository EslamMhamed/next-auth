import { SignUp } from "@clerk/nextjs"

function page() {
  return (
    <div className="flex items-center justify-center p-5">
        <SignUp />
    </div>
  )
}

export default page