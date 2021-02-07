import Link from "next/link";
import { data } from "../../data";

export default function user() {

  return (
    <div>
      {data.map(item =>
        <Link key={item.id} href="/user/[id]" as={`/user/${item.id}`}>
          <a><li>{item.id}. {item.name}</li></a>
        </Link>)
      }
    </div>);
}


// const SquircleCard = ({ data }) => {
//   const { id, label, src } = data;

//   const interviewData = data.filter(interview => interview.id === id);

//   return (
//     <div>
//       <Link href="/interview/[id]" as={`/interview/${id}`}>
//         <a>hello</a>
//       </Link>
//     </div>);
// }