'use client'
import { SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function AuthButton() {

    const {userId} = useAuth()

    if(userId){
      return <UserButton/>
    }

  return (
    <div className="space-x-2">
        <SignInButton mode="modal">
            <Button variant={"outline"}>
              ログイン
            </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button variant={"outline"}>
              登録
            </Button>
        </SignUpButton>
    </div>
  )
}
