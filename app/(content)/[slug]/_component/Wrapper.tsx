interface Props {
    children: React.ReactNode,
    no: number,
    title: string,
    id: string
}

const Wrappper: React.FC<Props> = (props: Props) => {
    return (
        <section className="my-shadow rounded-md p-6 text-white" id={props.id}>
            <div className="w-full flex text-xl gap-2 font-semibold tracking-wider border-bottom border-white pb-4">
                <p className="text-primary">{props.no}.</p>
                <p>{props.title}</p>
            </div>
            <div className="mt-4">
                {props.children}
            </div>
        </section>
    );
}

export default Wrappper;