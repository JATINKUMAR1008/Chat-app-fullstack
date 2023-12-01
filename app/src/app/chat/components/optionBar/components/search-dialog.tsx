import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React from "react"
import UserAddAndSearch from "./user-search-add"

export default function SearchDialog({children}:{children: React.ReactNode}) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Search People 🧑‍🦰</DialogTitle>
                    <DialogDescription>
                        You can Search any verified user and start chatting with them.
                    </DialogDescription>
                </DialogHeader>
                
                    <UserAddAndSearch/>
            </DialogContent>
        </Dialog>

    )
}