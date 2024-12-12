import Menu from './components/Menu'
import Tabs from './components/Tabs'

export default function Home() {
  return (
    <>
      <Menu />
      <div className="ml-[52px] bg-slate-600 h-[100vh] w-[calc(100%-52px)]">
        <Tabs />
      </div>
    </>
  )
}
