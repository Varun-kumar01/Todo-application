export function Card(props){
    return <div className="border border-gray-200 shadow-lg p-5 rounded-md bg-gray-200 h-auto w-xl mx-10 md:mx-80 ">
        {props.children}
    </div>
}