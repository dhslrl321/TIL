import Curriulum from "../components/sections/Curriculum";
import { data } from "../components/sections/Curriculum/data";
export default function Home() {
  return (
    <div>
      <Curriulum datas={data} />
    </div>
  )
}
