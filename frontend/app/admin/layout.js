import { Header, AdminNavbar } from '@/components'

export default function admin({ children }) {
  return (
    <section className='main relative flex flex-col py-2 gap-4'>
        <Header />
        <div className='flex w-full gap-6'>
            <AdminNavbar />
            {children}
        </div>
    </section>
  )
}
