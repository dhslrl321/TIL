import Curriulum from "../components/sections/Curriculum";
import { data } from "../components/sections/Curriculum/data";
import Navbar from "../components/modules/Navbar";
export default function Home() {
  return (
    <div>
      <Navbar toggle={false} />
      <Curriulum datas={data} />
    </div>
  )
}
