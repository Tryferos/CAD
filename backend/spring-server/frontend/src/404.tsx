import { FC, Fragment } from 'react'
import { Link } from 'react-router-dom'
const NotFound: FC = (props) => {
    return (
        <div className='w-full h-[80vh] flex items-center py-20 gap-y-10 flex-col *:text-3xl font-semibold'>
            <img src={"/basketball.svg"} className='object-contain size-[20%]' />
            <h1 className='mt-10'>404</h1>
            <p>Η σελίδα δεν βρέθηκε</p>
            <Link to={'/'}>
                <p className='px-4 py-2 outline outline-1 rounded-md text-lg outline-sec shadow-sec hover:shadow-shadowSecHover hover:bg-sec text-sec hover:text-white hover:brightness-90'>
                    Επιστροφή στην αρχική σελίδα
                </p>
            </Link>
        </div>
    )
}

export default NotFound