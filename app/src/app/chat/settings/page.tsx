import { Button } from "@/components/ui/button";

export default function SettingPage() {
    return (
        <div className="flex flex-col w-full items-center justify-center py-10 px-5">
            <div className="flex flex-col w-full ml-10 h-fit max-h-screen overflow-y-auto ">
                <h1 className="text-2xl font-semibold">
                    Edit Profile
                </h1>
                <table className="w-full h-full gap-3 py-4 mt-10 " >
                    <tr className="">
                        <td className="min-w-[100px]">
                            <div className="rounded-full w-16 h-16 bg-white">

                            </div>
                        </td>
                        <td className="my-2">
                            <div className="flex flex-col items-start">
                                <p className="text-lg font-semibold">Username</p>
                                <p className="font-extarlight text-blue-700">Change profile photo</p>
                            </div>
                        </td>
                    </tr>
                    <tr className="my-2">
                        <td className="min-w-[100px]">
                            <div className="font-semibold text-xl text">
                                Website
                            </div>
                        </td>
                        <td>
                            <div className="flex flex-col gap-1 items-start max-w-[40%] my-5">
                                <input className="px-3 py-2 w-full" placeholder="Website" />
                                <p className="text-xs text-gray-400">Editing your links is only available on mobile. Visit the Pelician app and edit your profile to change the websites in your bio.</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="min-w-[100px]">
                            <div className="font-semibold text-xl py-2">
                                Bio
                            </div>
                        </td>
                        <td>
                            <div className="flex flex-col gap-1 items-start max-w-[40%]">
                                <textarea className="px-3 py-2 w-full resize-none" placeholder="Bio" />

                            </div>
                        </td>
                    </tr>
                    <tr className="my-2">
                        <td className="min-w-[100px]">
                            <div className="font-semibold text-xl text">
                                Gender
                            </div>
                        </td>
                        <td>
                            <div className="flex flex-col gap-1 items-start max-w-[40%] my-5">
                                <input className="px-3 py-2 w-full" placeholder="Website" />
                                <p className="text-xs text-gray-400">Editing your links is only available on mobile. Visit the Pelician app and edit your profile to change the websites in your bio.</p>
                            </div>
                        </td>
                    </tr>

                </table>
                <hr className="w-full h-[1px] bg-gray-200 my-1"/>
                <div className="w-full my-5 flex flex-col items-end max-w-[70%]">
                    <h1 className="my-5 text-2xl font-semibold text-left w-full">
                        Change Password
                    </h1>
                    <table className="w-full h-full">
                        <tr className="my-2">
                            <td className="min-w-[200px]">
                                <div className="font-semibold text-xl text">
                                    New Password
                                </div>
                            </td>
                            <td>
                                <div className="flex flex-col gap-1 items-start max-w-[60%] my-5">
                                    <input className="px-3 py-2 w-full" placeholder="Website" />
                                    <p className="text-xs text-gray-400">Editing your password, will change password in our Database. You can not be able to access if you forgot your new password. This account will be logout from all devices.</p>
                                </div>
                            </td>
                        </tr>
                        <tr className="my-2">
                            <td className="min-w-[200px]">
                                <div className="font-semibold text-xl text">
                                    Confirm Password
                                </div>
                            </td>
                            <td>
                                <div className="flex flex-col gap-1 items-start max-w-[60%] my-5">
                                    <input className="px-3 py-2 w-full" placeholder="Website" />
                                </div>
                            </td>
                        </tr>
                    </table>
                    <Button>
                        Save
                    </Button>
                </div>
                
            </div>
        </div>
    )
}