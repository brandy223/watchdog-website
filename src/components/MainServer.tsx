
export const MainServer = () => {
    // const [mainServer, setMainServer] = useState<string>("192.168.10.54");
    //
    // const socket = useSocketConnection("http://192.168.10.44:3001");

    // useSocketEvent(socket, "test", (data: string) => {
    //     setMainServer(data);
    // });
    // const mainServer:string = "192.168.10.58";

    const mainServer: string = "192.168.10.58";

    return (
        <div>
            <a className="text-mainWhite font-medium rounded-full border-2 border-validGreen text-sm px-4 py-2 text-center mr-3 md:mr-0">
                {mainServer}
            </a>
            <a className="text-mainWhite ml-4 font-medium rounded-full border-2 border-mainRed text-sm px-4 py-2 text-center mr-3 md:mr-0">
                192.168.10.44
            </a>
        </div>
    )
}