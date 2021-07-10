import * as S from "./Profile.styles";

import { BiChevronDown } from "react-icons/bi";

const Profile = () => {

  const none = "https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?gif=1&w=640&h=640&c=c";
  const hak = "http://k.kakaocdn.net/dn/boEp6l/btq6MTNzPgH/mVE7m02pyxfoMLZIb0iJQK/img_640x640.jpg";
  return (
    <S.Container>
      <S.ProfileImg src={hak} />
    </S.Container>
  )
}

export default Profile
