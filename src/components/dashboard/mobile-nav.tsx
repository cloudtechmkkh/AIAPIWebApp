import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"
import DashboardNav from "./nav"

export default function MobileNav(){
    return(
        <Sheet>
  <SheetTrigger>
    <Button variant={"ghost"} className="mr-2 px-0 text-base hover:bg-transparent md:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">メニューを開く</span>
    </Button>
  </SheetTrigger>
  <SheetContent side={"left"}>
    <SheetHeader>
      <SheetTitle>メニュー</SheetTitle>
      <DashboardNav />
    </SheetHeader>
  </SheetContent>
</Sheet>
    )
}