import {Trash2, Circle} from 'lucide-react'


export function Todo(props){
    return <div className='flex justify-between items-center bg-white p-5 rounded-full w-100 sm:w-130  px-10 shadow-xl'>
        <div className='flex justify-between items-center space-x-3 '>
            <div onClick={props.edit} className='cursor-pointer'>{props.children}</div>
            <div className={`${props.style}`} >{props.title}</div>
        </div>
        <div onClick={props.removed} className='cursor-pointer'><Trash2 /></div>
    </div>
}
