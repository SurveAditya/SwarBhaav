
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import { getSession, useSession } from "next-auth/react"


export default function DashLayout({ children }) {
    const { data: session } = useSession()
    return (
        <div className="min-h-screen">
            <Navbar session={session} />
            <div className='min-h-[calc(100vh - 64px)] md:min-h-[calc(100vh - 80px)] container flex flex-col justify-center items-center text-center gap-2 md:gap-4 p-4 bg-cyan-100 '>
                {children}
            </div>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }
}