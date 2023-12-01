export default function TopBar() {
    return (
        <div className="w-full h-full border-b-[1px] border-[#323233] gap-3 flex items-center px-10">
            <div className="w-full flex items-start gap-3">
                <h1 className="text-left text-gray-200 text-3xl ml-3 font-semibold font-sans">
                    #
                </h1>
                <div className="flex flex-col gap-3 items-start">
                    <p className="text-3xl text-white"> Pelican room</p>
                    <div className="flex items-center gap-5">
                        <span className="font-extralight text-gray-200 ">
                            6 members
                        </span>
                        <span className="text-white cursor-pointer flex items-center gap-2">
                            <p className="text-2xl">+</p> Add member
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}