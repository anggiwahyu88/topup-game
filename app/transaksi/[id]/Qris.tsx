import Image from "next/image";

const Qris = ({ url }: { url: string }) => {
    return (
        <div className="w-max mx-auto">
            <div className=" p-1 bg-white rounded-lg">
                <Image src={url} alt="qrcode" width={200} height={200} sizes="200px" />
            </div>
            <button className="rounded-lg w-full bg-primary mt-2 text-dark py-1">Donload</button>
        </div>
    );
}

export default Qris;